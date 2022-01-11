import { takeLatest, put, call } from "@redux-saga/core/effects";
import { ACCOUNT_ACTION } from "@Constants/actions/account";
import { loginSuccess, logoutSuccess } from "../actions/account";
import {
  getAddressAvailability,
  handleAuthenticate,
  handleLogout,
  handleRegister,
} from "@Services/loginServices";
import { sessionServices } from "@Services";
const authSignature = async (user) => {
  const message = `I am signing my one-time nonce: ${user.nonce}`;
  try {
    const from = user.public_address;
    const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;
    return window.ethereum
      .request({
        method: "personal_sign",
        params: [msg, from, "Example password"],
      })
      .then(async (sign) => {
        handleAuthenticate({
          publicAddress: user.public_address,
          signature: sign,
          chainId: user.chain_id.toString(),
        }).then(async (res) => {
          await sessionServices.saveAccountSession({
            access: res.access.token,
            refresh: res.refresh.token,
          });
        });
        return true;
      });
  } catch (error) {
    console.log(error);
  }
};
export const accountSagas = [
  takeLatest(ACCOUNT_ACTION.LOGIN_REQUEST, handleLoginRequest),
  takeLatest(ACCOUNT_ACTION.LOGIN_SUCCESS, handleLoginSuccess),
  takeLatest(ACCOUNT_ACTION.LOGOUT_REQUEST, logout),
];

function* handleLoginRequest(data) {
  // do something request service
  const body = data.credential;
  try {
    const response = yield call(getAddressAvailability, body);
    let { error, data } = response;
    if (error) {
      throw new Error(error);
    } else {
      const user = response.user;
      if (response.userFound) {
        const auth = yield call(authSignature, user);
        if (auth) {
          const userData = {
            role: user.role,
            isLogin: true,
            address: user.public_address,
            chainId: user.chain_id,
            status: user.status,
            email: user.email,
            fullName: user.fullName,
            ref: user.referalAddress.toLowerCase()
          };
          yield put(loginSuccess(userData));
        }
      } else {
        const register = yield call(handleRegister, body);
        if (register) {
          const auth = yield call(authSignature, register.user);
          if (auth) {
            const userData = {
              role: register.user.role,
              isLogin: true,
              address: register.user.public_address,
              chainId: register.user.chain_id,
            };
            yield put(loginSuccess(userData));
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleLoginSuccess(data) {
  // update state when login successful
}

function* logout() {
  // handle actions logout
  try {
    const token = yield call(sessionServices.getRefreshToken);
    if (!token) {
      yield call(sessionServices.deleteAccountSession);
      yield put(logoutSuccess());
      return;
    }
    const response = yield call(handleLogout, { refreshToken: token });
    if (response.success) {
      yield call(sessionServices.deleteAccountSession);
      yield put(logoutSuccess());
      return;

      // window.location.reload();
    }
    if (response.code === 400 || response.code === 404) {
      yield call(sessionServices.deleteAccountSession);
      yield put(logoutSuccess());
      return;
    }
  } catch (error) {
    console.log(error.message);
  }

  //   yield put(handleLogout());
}

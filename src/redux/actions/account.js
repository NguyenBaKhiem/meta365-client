import { ACCOUNT_ACTION } from "@Constants/actions/account";

export function loginRequest(credential) {
  return {
    type: ACCOUNT_ACTION.LOGIN_REQUEST,
    credential,
  };
}
export function logoutRequest(token) {
  return {
    type: ACCOUNT_ACTION.LOGOUT_REQUEST,
  };
}

export const updateAddress = (param) => {
  return { type: ACCOUNT_ACTION.UPDATE_ADDRESS, payload: param };
};

export const updateChainId = (param) => {
  return { type: ACCOUNT_ACTION.UPDATE_CHAIN_ID, payload: param };
};

export const updateRole = (param) => {
  return { type: ACCOUNT_ACTION.UPDATE_ROLE, payload: param };
};

export const updateUser = (param) => {
  return { type: ACCOUNT_ACTION.UPDATE_USER, payload: param };
};

export const loginSuccess = (param) => {
  return { type: ACCOUNT_ACTION.LOGIN_SUCCESS, payload: param };
};

export const logoutSuccess = () => {
  return { type: ACCOUNT_ACTION.LOGOUT };
};

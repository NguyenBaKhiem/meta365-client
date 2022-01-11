import { ACCOUNT_ACTION } from "@Constants/actions/account";

export const defaultState = {
  role: "",
  isLogin: false,
  address: "",
  chainId: undefined,
  id: "",
  status: "",
  ref: ""
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case ACCOUNT_ACTION.LOGIN_SUCCESS:
      const user = action.payload;
      return { ...state, ...user };
    case ACCOUNT_ACTION.LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
export default auth;

import { MYLAND_ACTIONS } from "../../constants/actions/market";

export const defaultState = {
  saleType: "market", // market, auction, reverse-auction
};

const myland = (state = defaultState, action) => {
  switch (action.type) {
    case MYLAND_ACTIONS.CHANGE_MYLAND_TYPE:
      const { saleType } = action.payload;
      return { ...state, saleType };
    default:
      return state;
  }
};

export default myland;
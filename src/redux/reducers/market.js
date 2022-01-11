import { MARKET_ACTIONS } from "../../constants/actions/market";

export const defaultState = {
  saleType: "market", // market, auction, reverse-auction
  unit: '',
};

const market = (state = defaultState, action) => {
  switch (action.type) {
    case MARKET_ACTIONS.CHANGE_SALE_TYPE:
      const { saleType, unit } = action.payload;
      return { ...state, saleType, unit };
    default:
      return state;
  }
};

export default market;

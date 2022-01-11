import { MARKET_ACTIONS } from "../../constants/actions/market"

export const changeSaleType = (param) => {
    return { type: MARKET_ACTIONS.CHANGE_SALE_TYPE, payload: param}
}
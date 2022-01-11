import { LAND_ACTIONS } from "../../constants/actions/land"

export const changeLand = (param) => {
    return { type: LAND_ACTIONS.CHANGE_LAND, payload: param}
}
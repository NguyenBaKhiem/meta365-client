import { MYLAND_ACTIONS } from "../../constants/actions/myland"

export const changeMyLandType = (param) => {
    return { type: MYLAND_ACTIONS.CHANGE_MYLAND_TYPE, payload: param}
}
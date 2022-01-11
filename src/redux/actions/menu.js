import { MENU_ACTIONS } from "@Constants/actions/menu"

export const showSidebar = () => {
    return {type: MENU_ACTIONS.SHOW_SIDEBAR}
}

export const hideSidebar = () => {
    return {type: MENU_ACTIONS.HIDE_SIDEBAR}
}
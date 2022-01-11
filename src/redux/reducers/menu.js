import { MENU_ACTIONS } from "@Constants/actions/menu";

export const defaultState = {
  showSidebar: false,
};

const menuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MENU_ACTIONS.SHOW_SIDEBAR:
      return { ...state, showSidebar: true };
    case MENU_ACTIONS.HIDE_SIDEBAR:
      return { ...state, showSidebar: false };
    default:
      return state;
  }
};

export default menuReducer;

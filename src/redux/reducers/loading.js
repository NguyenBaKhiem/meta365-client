import { LOADING } from "../../constants/actions/loading";

export const defaultState = {
  isLoading: false,
};

const loading = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loading;

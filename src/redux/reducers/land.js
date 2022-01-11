import { LAND_ACTIONS } from "../../constants/actions/land";

export const defaultState = {
  id: '',
  name: '',
};

const land = (state = defaultState, action) => {
  switch (action.type) {
    case LAND_ACTIONS.CHANGE_LAND:
      const { landId } = action.payload;
      return { ...state, landId };
    default:
      return state;
  }
};

export default land;

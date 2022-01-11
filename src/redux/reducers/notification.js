import { NOTIFICATION_ACTIONS } from "@Constants/actions/notification"


export const defaultState = {
    isShow:false,
    stateNotification: "Error",
    message :""
};

const notificationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.SHOW_NOTIFICATION_ERROR:
            return { ...state,isShow:true,stateNotification:"Error", message:action.payload };
        case NOTIFICATION_ACTIONS.SHOW_NOTIFICATION_WARNING:
            return { ...state,isShow:true,stateNotification:"Warning", message:action.payload };
        case NOTIFICATION_ACTIONS.SHOW_NOTIFICATION_SUCCESS:
            return { ...state,isShow:true,stateNotification:"Success", message:action.payload };
        case NOTIFICATION_ACTIONS.HIDE_NOTIFICATION:
            return { ...state, isShow: false };
        default:
            return state;
    }
};

export default notificationReducer;

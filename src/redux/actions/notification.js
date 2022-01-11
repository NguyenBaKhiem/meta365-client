import { NOTIFICATION_ACTIONS } from "@Constants/actions/notification"

export const showNotificationError = (params) => {
    return {type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION_ERROR,payload:params}
}
export const showNotificationWarning = (params) => {
    return {type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION_WARNING,payload:params}
}
export const showNotificationSuccess = (params) => {
    return {type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION_SUCCESS,payload:params}
}

export const hideNotification = () => {
    return {type: NOTIFICATION_ACTIONS.HIDE_NOTIFICATION}
}

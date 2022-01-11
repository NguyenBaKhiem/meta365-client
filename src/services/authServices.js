import {
  showNotificationError
} from "@Redux/actions/notification";
import { store } from "@Redux/reducers";
import { sessionServices } from "@Services";

const BACKEND_URL = `${process.env.REACT_APP_API_SERVER}`;

/**
 * Get new access token user
 * @param credential
 * @returns {Promise<*|*|*|*|boolean>}
 */
async function getNewAccessToken() {
  try {
    const refreshToken = await sessionServices.getRefreshToken();
    if (refreshToken) {
      const response = await fetch(BACKEND_URL + "/auth/refresh-tokens", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });
      const { status } = response;
      if (status !== 201) {
        store.dispatch(showNotificationError("Your session has expired!"));
        return Promise.resolve({ error: true, data: "exception" });
      }

      const responseJson = await response.json();
      const { access, refresh } = responseJson;
      await sessionServices.saveAccountSession({
        access: access.token,
        refresh: refresh.token
      });
      return responseJson;
    }
    return Promise.resolve({ error: true, data: "exception" });
  } catch (ex) {
    return Promise.resolve({ error: true, data: "exception" });
  }
}

export const authServices = {
  getNewAccessToken
};

import { sessionServices, authServices } from "@Services";
import queryString from "query-string";
import { store } from "@Redux/reducers";
import { logoutRequest } from "@Redux/actions/account";

const handleLogout = async () => {
  store.dispatch(logoutRequest());
};
/**
 *
 * @param {*} url
 * @param {*} isCallForce
 */
export async function getAsync(url) {
  try {
    const token = await sessionServices.getAccessToken();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
    const { status, code } = response;
    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }
    /**
     * token expired will call access refresh token if ok then continue else logout
     */
    if (status === 401 || code === 401) {
      const result = await authServices.getNewAccessToken();
      const { access } = result;
      if (access) {
        const { token } = access;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        });
        const { status } = response;
        if (status === 500) {
          return Promise.reject(new Error("exception code 500"));
        }
        const responseJson = await response.json();
        const { data } = responseJson;
        if (data === "Not Found") {
          responseJson.data = [];
        }
        return Promise.resolve(responseJson);
      } else {
        handleLogout();
        window.location.href = `${process.env.REACT_APP_BASE_URL}`
        return Promise.reject(new Error("not login"));
      }
    }

    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    const responseJson = await response.json();
    const { data } = responseJson;
    if (data === "Not Found") {
      responseJson.data = [];
    }
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("get async is exception"));
}

/**
 *
 * @param {*} url
 * @param {*} body
 */
export async function postAsync(url, body = {}, isLogout = true) {
  try {
    const token = await sessionServices.getAccessToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(body)
    });
    const { status, code } = response;

    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }
    /**
     * token expired will call access refresh token if ok then continue else logout
     */
    if (status === 401 || code === 401) {
      const result = await authServices.getNewAccessToken();
      const { access } = result;
      if (access) {
        const { token } = access;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(body)
        });
        const { status } = response;
        if (status === 500) {
          return Promise.reject(new Error("exception code 500"));
        }
        const responseJson = await response.json();
        return Promise.resolve(responseJson);
      } else {
        isLogout && handleLogout();
        window.location.href = `${process.env.REACT_APP_BASE_URL}`
        return Promise.reject(new Error("not login"));
      }
    }
    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("POST EXCEPTION"));
}

/**
 *
 * @param {*} url
 * @param {*} body
 */
export async function postFormDataAsync(url, body = {}, isLogout = true) {
  try {
    const token = await sessionServices.getAccessToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: body
    });
    const { status, code } = response;
    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }
    /**
     * token expired will call access refresh token if ok then continue else logout
     */
    if (status === 401 || code === 401) {
      const result = await authServices.getNewAccessToken();
      const { access } = result;
      if (access) {
        const { token } = access;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token
          },
          body: body
        });
        const { status } = response;
        if (status === 500) {
          return Promise.reject(new Error("exception code 500"));
        }
        const responseJson = await response.json();
        return Promise.resolve(responseJson);
      } else {
        isLogout && handleLogout();
        window.location.href = `${process.env.REACT_APP_BASE_URL}`
        return Promise.reject(new Error("not login"));
      }
    }
    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("POST EXCEPTION"));
}

export async function fetchAsync(url, params) {
  try {
    const token = await sessionServices.getAccessToken();
    const response = await fetch(url + "?" + queryString.stringify(params), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
    const { status, code } = response;
    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }
    /**
     * token expired will call access refresh token if ok then continue else logout
     */
    if (status === 401 || code === 401) {
      const result = await authServices.getNewAccessToken();
      const { access } = result;
      if (access) {
        const { token } = access;
        const response = await fetch(
          url + "?" + queryString.stringify(params),
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          }
        );
        const { status } = response;
        if (status === 500) {
          return Promise.reject(new Error("exception code 500"));
        }
        const responseJson = await response.json();
        const { data } = responseJson;
        if (data === "Not Found") {
          responseJson.data = [];
        }
        return Promise.resolve(responseJson);
      } else {
        handleLogout();
        window.location.href = `${process.env.REACT_APP_BASE_URL}`
        return Promise.reject(new Error("not login"));
      }
    }
    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("get async is exception"));
}

/**
 *
 * @param {*} url
 * @param {*} body
 */
export async function putAsync(url, body = {}) {
  try {
    const token = await sessionServices.getAccessToken();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(body)
    });
    const { status, code } = response;
    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }
    /**
     * token expired will call access refresh token if ok then continue else logout
     */
    if (status === 401 || code === 401) {
      const result = await authServices.getNewAccessToken();
      const { access } = result;
      if (access) {
        const { token } = access;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(body)
        });
        const { status } = response;
        if (status === 500) {
          return Promise.reject(new Error("exception code 500"));
        }
        const responseJson = await response.json();
        const { data } = responseJson;
        if (data === "Not Found") {
          responseJson.data = [];
        }
        return Promise.resolve(responseJson);
      } else {
        handleLogout();
        window.location.href = `${process.env.REACT_APP_BASE_URL}`
        return Promise.reject(new Error("not login"));
      }
    }
    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("post async is exception"));
}

/**
 *
 * @param {*} url
 * @param {*} body
 */
export async function deleteAsync(url, body = {}) {
  try {
    const token = await sessionServices.getAccessToken();
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(body)
    });
    const { status, code } = response;
    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }
    /**
     * token expired will call access refresh token if ok then continue else logout
     */
    if (status === 401 || code === 401) {
      const result = await authServices.getNewAccessToken();
      const { access } = result;
      if (access) {
        const { token } = access;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(body)
        });
        const { status } = response;
        if (status === 500) {
          return Promise.reject(new Error("exception code 500"));
        }
        const responseJson = await response.json();
        const { data } = responseJson;
        if (data === "Not Found") {
          responseJson.data = [];
        }
        return Promise.resolve(responseJson);
      } else {
        handleLogout();
        window.location.href = `${process.env.REACT_APP_BASE_URL}`
        return Promise.reject(new Error("not login"));
      }
    }
    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("put async is exception"));
}

/**
 *
 * @param {*} url
 * @param {*} body
 */
export async function patchAsync(url, body = {}) {
  try {
    const token = await sessionServices.getAccessToken();
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(body)
    });
    const { status, code } = response;
    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }
    /**
     * token expired will call access refresh token if ok then continue else logout
     */
    if (status === 401 || code === 401) {
      const result = await authServices.getNewAccessToken();
      const { access } = result;
      if (access) {
        const { token } = access;
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify(body)
        });
        const { status } = response;
        if (status === 500) {
          return Promise.reject(new Error("exception code 500"));
        }
        const responseJson = await response.json();
        const { data } = responseJson;
        if (data === "Not Found") {
          responseJson.data = [];
        }
        return Promise.resolve(responseJson);
      } else {
        handleLogout();
        window.location.href = `${process.env.REACT_APP_BASE_URL}`
        return Promise.reject(new Error("not login"));
      }
    }
    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("post async is exception"));
}

export async function nonAuthGet(url, filter) {
  const params = queryString.stringify(filter);
  try {
    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const { status, code } = response;
    if (status === 500) {
      return Promise.reject(new Error("exception code 500"));
    }

    const responseJson = await response.json();
    const { data } = responseJson;
    if (data === "Not Found") {
      responseJson.data = [];
    }
    if (status === 403 || code === 403) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}/403`;
    }
    return Promise.resolve(responseJson);
  } catch (ex) {
    console.log(ex);
  }
  return Promise.reject(new Error("get async is exception"));
}

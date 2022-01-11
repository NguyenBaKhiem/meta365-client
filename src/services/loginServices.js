import { nonAuthGet, postAsync } from "@Helpers/request";

const LOGIN_API_URL = `${process.env.REACT_APP_API_SERVER}/auth`;

export const getAddressAvailability = async (params) => {
  try {
    const response = await nonAuthGet(
      `${LOGIN_API_URL}/public-address-availability`,
      params
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = async (data) => {
  try {
    const response = await postAsync(`${LOGIN_API_URL}/register`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const handleAuthenticate = async (data) => {
    try {
        const response = await postAsync(`${LOGIN_API_URL}`, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const handleLogout = async (data) => {
    try {
        const response = await postAsync(`${LOGIN_API_URL}/logout`, data, true);
        return response;
    } catch (error) {
        console.log(error);
    }
}
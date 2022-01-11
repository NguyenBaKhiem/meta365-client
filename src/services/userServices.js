import {
  patchAsync,
  deleteAsync,
  fetchAsync,
  getAsync
} from "@Helpers/request";
const USER_API_URL = `${process.env.REACT_APP_API_SERVER}/user`;

const getUsers = async (filter) => {
  try {
    const response = await fetchAsync(USER_API_URL, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateUser = async (data) => {
  try {
    const response = await patchAsync(USER_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateUserById = async (id, data) => {
  try {
    const response = await patchAsync(`${USER_API_URL}/${id}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const deleteUserById = async (id) => {
  try {
    const response = await deleteAsync(`${USER_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const assignRole = async (userId, data) => {
  try {
    const response = await patchAsync(
      `${USER_API_URL}/${userId}/assign-role`,
      data
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getRoles = async (id) => {
  try {
    const response = await fetchAsync(`${USER_API_URL}/role`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getMe = async () => {
  try {
    const response = await getAsync(`${USER_API_URL}/me`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getAllRoles = async () => {
  try {
    const response = await getAsync(`${USER_API_URL}/role`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateMe = async (data) => {
  try {
    const response = await patchAsync(`${USER_API_URL}/me/update`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const userServices = {
  getRoles,
  assignRole,
  deleteUserById,
  updateUserById,
  getUsers,
  getMe,
  updateMe,
  getAllRoles
};

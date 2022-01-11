import {
  deleteAsync, fetchAsync, nonAuthGet, patchAsync, postAsync
} from "@Helpers/request";
const LAND_API_URL = `${process.env.REACT_APP_API_SERVER}/land`;

const getLands = async (filter) => {
  try {
    const response = await nonAuthGet(LAND_API_URL, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const postLand = async (data) => {
  try {
    const response = await postAsync(LAND_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateLandById = async (id, data) => {
  try {
    const response = await patchAsync(`${LAND_API_URL}/${id}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateLands = async (data) => {
  try {
    const response = await patchAsync(`${LAND_API_URL}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const deleteLandById = async (id) => {
  try {
    const response = await deleteAsync(`${LAND_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const deleteLands = async (data) => {
  try {
    const response = await deleteAsync(`${LAND_API_URL}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getLandDetails = async (id) => {
  try {
    const response = await nonAuthGet(`${LAND_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getNftsByLand = async (id, filter) => {
  try {
    const response = await nonAuthGet(`${LAND_API_URL}/${id}/nft`, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};
const getLandByProject = async (projectPath, landCode) => {
  try {
    const response = await nonAuthGet(
      `${LAND_API_URL}/detail/${projectPath}/${landCode}`
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getUnmintLand = async (filter) => {
  try {
    const response = await fetchAsync(`${LAND_API_URL}/unmint`, { ...filter });
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const landServices = {
  getLands,
  postLand,
  getLandDetails,
  deleteLandById,
  deleteLands,
  updateLands,
  updateLandById,
  getNftsByLand,
  getLandByProject,
  getUnmintLand,
};

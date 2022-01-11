import queryString from "query-string";

import {
  fetchAsync,
  postAsync,
  patchAsync,
  deleteAsync,
  getAsync,
  nonAuthGet
} from "@Helpers/request";
const PROJECT_API_URL = `${process.env.REACT_APP_API_SERVER}/project`;

const getProjects = async (filter) => {
  try {
    const response = await nonAuthGet(PROJECT_API_URL, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const postProject = async (data) => {
  try {
    const response = await postAsync(PROJECT_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateProjectById = async (id, data) => {
  try {
    const response = await patchAsync(`${PROJECT_API_URL}/${id}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getProjectDetails = async (id) => {
  try {
    const response = await nonAuthGet(`${PROJECT_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateProjects = async (data) => {
  try {
    const response = await patchAsync(`${PROJECT_API_URL}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const deleteProjects = async (ids) => {
  try {
    const response = await deleteAsync(`${PROJECT_API_URL}`, ids);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getLandByProject = async (id) => {
  try {
    const response = await nonAuthGet(`${PROJECT_API_URL}/${id}/land`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const projectServices = {
  getLandByProject,
  deleteProjects,
  updateProjects,
  getProjectDetails,
  updateProjectById,
  postProject,
  getProjects
}
import {
  postAsync,
  patchAsync,
  deleteAsync,
  getAsync,
  nonAuthGet,
  fetchAsync
} from "@Helpers/request";
const ARTICLE_API_URL = `${process.env.REACT_APP_API_SERVER}/article`;

const getArticles = async (filter) => {
  try {
    const response = await fetchAsync(ARTICLE_API_URL, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getPublicArticles = async (filter) => {
  try {
    const response = await nonAuthGet(`${ARTICLE_API_URL}/posted`, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const postArticle = async (data) => {
  try {
    const response = await postAsync(ARTICLE_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateArticleById = async (id, data) => {
  try {
    const response = await patchAsync(`${ARTICLE_API_URL}/${id}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateArticles = async (data) => {
  try {
    const response = await patchAsync(`${ARTICLE_API_URL}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const deleteArticleById = async (id) => {
  try {
    const response = await deleteAsync(`${ARTICLE_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const deleteArticles = async (data) => {
  try {
    const response = await deleteAsync(`${ARTICLE_API_URL}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getArticleDetails = async (id) => {
  try {
    const response = await getAsync(`${ARTICLE_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getPublicDetailArticle = async (id) => {
  try {
    const response = await nonAuthGet(`${ARTICLE_API_URL}/posted/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const articleServices = {
  getArticles,
  postArticle,
  getArticleDetails,
  deleteArticleById,
  deleteArticles,
  updateArticleById,
  updateArticles,
  getPublicDetailArticle,
  getPublicArticles
};

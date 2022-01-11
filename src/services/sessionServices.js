import * as localForage from "localforage";

const STORAGE_ACCOUNT_SESSION = "META365_ACCOUNT_SESSION";

async function getDataByKey(key) {
  try {
    const data = await localForage.getItem(key);
    if (!data) return { c: 0, data };
    return { c: 0, data: JSON.parse(data) || {} };
  } catch (ex) {
    console.log(ex);
  }
  return { c: -1 };
}

async function saveDataByKey(key, store) {
  await localForage.setItem(key, JSON.stringify(store));
}

async function removeDataByKey(key) {
  await localForage.removeItem(key);
}

async function saveAccountSession(data) {
  await localForage.setItem(STORAGE_ACCOUNT_SESSION, JSON.stringify(data));
}

function saveAccessToken(token) {}

function saveRefreshToken(token) {}

async function getAccessToken() {
  try {
    const data = await localForage.getItem(STORAGE_ACCOUNT_SESSION);
    if (!data) return "";
    return JSON.parse(data).access;
  } catch (ex) {
    console.error(ex);
  }
  return "";
}
async function getRefreshToken() {
  try {
    const data = await localForage.getItem(STORAGE_ACCOUNT_SESSION);
    if (!data) return "";
    return JSON.parse(data).refresh;
  } catch (ex) {
    console.error(ex);
  }
  return "";
}

async function deleteAccountSession() {
  await localForage.removeItem(STORAGE_ACCOUNT_SESSION);
}

function clearAccessToken() {}

async function getUserData() {
  try {
    const data = await localForage.getItem(STORAGE_ACCOUNT_SESSION);
    if (!data) return "";
    return JSON.parse(data);
  } catch (ex) {
    console.error(ex);
  }
  return "";
}

export const sessionServices = {
  saveAccessToken,
  getAccessToken,
  clearAccessToken,
  saveAccountSession,
  deleteAccountSession,
  getUserData,
  getDataByKey,
  saveDataByKey,
  removeDataByKey,
  getRefreshToken,
  saveRefreshToken
};

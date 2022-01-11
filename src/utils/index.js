// @ts-nocheck
import jwt_decode from "jwt-decode";
import { sessionServices } from "@Services/sessionServices";
import { authServices } from "@Services/authServices";

function getTokenExpirationDate(token) {
  const decoded = jwt_decode(token);
  if (decoded.exp === undefined) return null;
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

const isTokenExpired = async () => {
  try {
    const token = await sessionServices.getAccessToken();

    if (!token) return true;
    const date = getTokenExpirationDate(token);
    if (!date) return true;
    window.date = date;
    const expire = !(date.valueOf() > new Date().valueOf());
    if (expire) {
      const { access } = await authServices.getNewAccessToken();
      if (access) {
        const { token } = access;
        const userData = await sessionServices.getUserData();
        userData.access = token;
        await sessionServices.saveAccountSession(userData);
        return false;
      }
    }
    return expire;
  } catch (ex) {
    console.log(ex);
  }
  return false;
};

const escapeRegExp = (s) => {
  return s.replace(/[$\/?[^{|}]/g, "\\$&");
};

const toDollar = (n) => {
  const numWithCommas = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${numWithCommas}`;
};
export const utils = {
  isTokenExpired,
  escapeRegExp,
  toDollar
};

import { postAsync, nonAuthGet, getAsync } from "@Helpers/request";
const MARKETPLACE_API_URL = `${process.env.REACT_APP_API_SERVER}/marketplace`;

const getMarketPlaceAll = async (filter) => {
  try {
    const response = await nonAuthGet(`${MARKETPLACE_API_URL}/all`, filter);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getMarketplaces = async (filter) => {
  try {
    const response = await nonAuthGet(MARKETPLACE_API_URL, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getMarketAuctions = async (filter) => {
  try {
    const response = await nonAuthGet(`${MARKETPLACE_API_URL}/auction`, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getReverseAuctions = async (filter) => {
  try {
    const response = await nonAuthGet(
      `${MARKETPLACE_API_URL}/reverse-auction`,
      filter
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const postMarketPlace = async (data) => {
  try {
    const response = await postAsync(MARKETPLACE_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getMarketDetail = async (nftId) => {
  try {
    const response = await nonAuthGet(`${MARKETPLACE_API_URL}/nft/${nftId}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getMarketActivity = async (marketSaleId) => {
  try {
    const response = await nonAuthGet(`${MARKETPLACE_API_URL}/${marketSaleId}/activity`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getMarketHistory = async (tokenId) => {
  try {
    const response = await nonAuthGet(
      `${MARKETPLACE_API_URL}/${tokenId}/history`,{
        limit: 20,
      }
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const buy = async (data) => {
  try {
    const response = await postAsync(`${MARKETPLACE_API_URL}/buy`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};
const bid = async (data) => {
  try {
    const response = await postAsync(`${MARKETPLACE_API_URL}/bid`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};
const acceptBid = async (marketId, data) => {
  try {
    const response = await postAsync(
      `${MARKETPLACE_API_URL}/${marketId}/accept`,
      data
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};
const getBid = async (marketSaleId) => {
  try {
    const response = await getAsync(
      `${MARKETPLACE_API_URL}/${marketSaleId}/bid`
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const marketplaceServices = {
  getMarketPlaceAll,
  getMarketDetail,
  getMarketActivity,
  postMarketPlace,
  getMarketAuctions,
  getMarketplaces,
  getMarketHistory,
  getReverseAuctions,
  buy,
  bid,
  acceptBid,
  getBid
};

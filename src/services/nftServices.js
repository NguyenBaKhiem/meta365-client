import {
  postAsync,
  getAsync,
  deleteAsync,
  putAsync,
  fetchAsync,
  nonAuthGet,
} from "@Helpers/request";

const NFT_API_URL = `${process.env.REACT_APP_API_SERVER}/nft`;

const getOwnNFTs = async (filter) => {
  try {
    const response = await fetchAsync(NFT_API_URL, {
      ...filter,
    });
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getNFTOnSale = async (filter) => {
  try {
    const response = await fetchAsync(`${NFT_API_URL}/onsale`, {
      ...filter,
    });
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getDetailNFT = async (id) => {
  try {
    const response = await getAsync(`${NFT_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const postNFT = async (data) => {
  try {
    const response = await postAsync(NFT_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateNFTById = async (id, data) => {
  try {
    const response = await putAsync(`${NFT_API_URL}/${id}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getLeaderboard = async () => {
  try {
    const response = await nonAuthGet(`${NFT_API_URL}/leader-board`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getNFTActivity = async (tokenId) => {
  try {
    const response = await nonAuthGet(`${NFT_API_URL}/${tokenId}/activity`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};
const getNFTActivityFilter = async (tokenId, filter) => {
  try {
    const response = await nonAuthGet(`${NFT_API_URL}/${tokenId}/activity`, {
      ...filter,
    });
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const nftServices = {
  getOwnNFTs,
  getNFTOnSale,
  getDetailNFT,
  postNFT,
  updateNFTById,
  getLeaderboard,
  getNFTActivity,
  getNFTActivityFilter,
};

import {
  getAsync,
  fetchAsync,
  nonAuthGet
} from "@Helpers/request";
const TRANSACTION_API_URL = `${process.env.REACT_APP_API_SERVER}/transaction`;

const getTransactions = async () => {
  try {
    const response = await nonAuthGet(TRANSACTION_API_URL);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getTransactionOverview = async () => {
  try {
    const response = await getAsync(`${TRANSACTION_API_URL}/overview`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getEventTransactions = async (data) => {
  try {
    const response = await fetchAsync(`${TRANSACTION_API_URL}/event`, data);
    // type: [1,2,3,4]
    // tokenId: nftId
    return response;
  } catch (ex) {
    console.log(ex);
  }
}
const getUCCTransactions = async (filter) => {
  try {
    const response = await fetchAsync(`${TRANSACTION_API_URL}/ucc`,{...filter});
    return response;
  } catch (ex) {
    console.log(ex);
  }
}

export const transactionServices = {
  getTransactionOverview,
  getTransactions,
  getEventTransactions,
  getUCCTransactions
};

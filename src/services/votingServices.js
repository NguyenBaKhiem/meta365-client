import { getAsync } from "@Helpers/request";
const MARKETPLACE_API_URL = `${process.env.REACT_APP_API_SERVER}/vote`;

const getVote = async (delegate) => {
  try {
    const response = await getAsync(`${MARKETPLACE_API_URL}/${delegate}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const votingServices = {
  getVote,
};

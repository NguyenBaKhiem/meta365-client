import {
  postAsync,
  patchAsync,
  deleteAsync,
  getAsync
} from "@Helpers/request";
const CONTACT_API_URL = `${process.env.REACT_APP_API_SERVER}/contact`;

const getContacts = async (filter) => {
  try {
    const response = await getAsync(CONTACT_API_URL, filter);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const postContact = async (data) => {
  try {
    const response = await postAsync(CONTACT_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const updateContactById = async (id, data) => {
  try {
    const response = await patchAsync(`${CONTACT_API_URL}/${id}`, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};


const deleteContactById = async (id) => {
  try {
    const response = await deleteAsync(`${CONTACT_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

const getContactDetails = async (id) => {
  try {
    const response = await getAsync(`${CONTACT_API_URL}/${id}`);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const contactServices = {
  getContacts,
  postContact,
  getContactDetails,
  deleteContactById,
  updateContactById
};

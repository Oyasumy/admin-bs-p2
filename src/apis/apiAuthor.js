import axios from "axios";
import { API_URL } from "constants/configRedux";


require('dotenv').config()

export const getAllAuthor = async () => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/authors`, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Edit Author
export const getEditAuthor = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .put(`${API_URL}/authors/update`,{data}, {
      headers: { "x-api-key": "mewmew" },
    
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
// Add Author
export const getAddAuthor = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/authors/post`,{data}, {
      headers: { "x-api-key": "mewmew" },
    
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Delete Author
export const getDeleteAuthor = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  console.log(data);
  await axios
    .post(`${API_URL}/authors/delete`,{data}, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};



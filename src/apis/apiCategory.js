import axios from "axios";
import { API_URL } from "constants/configRedux";


require('dotenv').config()

export const getAllCategory = async () => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/categories`, {
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

// Edit CAtegory
export const getEditCategory = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .put(`${API_URL}/categories/update`,{data}, {
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
// Add Category
export const getAddCategory = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/categories/post`,{data}, {
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

// Delete Category
export const getDeleteCategory = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  console.log(data);
  await axios
    .post(`${API_URL}/categories/delete`,{data}, {
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



import axios from "axios";
import { API_URL } from "constants/configRedux";


require('dotenv').config()

export const getAllProduct = async (page) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/products/?page=${page}`, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
   
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Edit Product
export const getEditProduct = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .put(`${API_URL}/products/update`,data, {
      headers: { "x-api-key": "mewmew" },
    
    })
    .then((res) => {
     
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
// Add Product
export const getAddProduct = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/products/post`,data, {
      headers: { "x-api-key": "mewmew" },
    
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 201) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Delete Product
export const getDeleteProduct = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  
  await axios
    .post(`${API_URL}/products/delete`,data, {
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



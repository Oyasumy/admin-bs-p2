import axios from "axios";
import { API_URL } from "constants/configRedux";

require("dotenv").config();

export const getShipCodeWithID = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/ship-code/get-ship-code`,
      { id: data },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
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

// get all ship code
export const getAllShipCode = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/ship-code/`, {
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
// Add ship code
export const getAddShipCode = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/ship-code/post`, data, {
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

// edit ship code
export const getEditShipCode = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .put(`${API_URL}/ship-code/update`, data, {
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

// Delete ship code
export const getDeleteShipCode = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  console.log(data);
  await axios
    .post(`${API_URL}/ship-code/delete`, data, {
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

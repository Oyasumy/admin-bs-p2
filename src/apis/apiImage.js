import axios from "axios";
import { API_URL } from "constants/configRedux";

require("dotenv").config();

export const getAllImage = async () => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/images`, {
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

// Add Image
export const getAddImage = async (img) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  var data = new FormData();
  data.append('files',img);
  await axios
    .post(`${API_URL}/images/upload`, data, {
      headers: { "x-api-key": "mewmew" },
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
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

// Delete Image
export const getDeleteImage = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  console.log(data);
  await axios
    .post(
      `${API_URL}/images/destroy`,
      { data },
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

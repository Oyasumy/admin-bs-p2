import axios from "axios";
import { API_URL } from "constants/configRedux";

require("dotenv").config();

export const getDiscountWithID = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/discounts/get-discount`,
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

// get all Discount
export const getAllDiscount = async () => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(
      `${API_URL}/discounts`,
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
// Add Author
export const getAddDiscount = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/discounts/post`,
       data ,
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

// Edit Discount
export const getEditDiscount = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .put(
      `${API_URL}/discounts/update`,
       data ,
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

// Delete Author
export const getDeleteDiscount = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  console.log(data);
  await axios
    .post(
      `${API_URL}/discounts/delete`,
      data ,
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

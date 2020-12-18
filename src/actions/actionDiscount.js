import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetDiscount = (data) => ({
  type: Types.SET_DISCOUNT,
  payload: {
    data,
  },
});

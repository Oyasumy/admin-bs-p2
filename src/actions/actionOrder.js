import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetOrder = (data) => ({
  type: Types.SET_ORDER,
  payload: {
    data,
  },
});

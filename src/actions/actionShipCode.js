import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetShipCode = (data) => ({
  type: Types.SET_SHIP_CODE,
  payload: {
    data,
  },
});

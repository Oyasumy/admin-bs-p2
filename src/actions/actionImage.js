import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetImages = (data) => ({
  type: Types.SET_IMAGE,
  payload: {
    data,
  },
});
export const handleAddImages = (data) => ({
  type: Types.ADD_IMAGE,
  payload: {
    data,
  },
});
export const handleDeleteImages = (data) => ({
  type: Types.DELETE_IMAGE,
  payload: {
    data,
  },
});

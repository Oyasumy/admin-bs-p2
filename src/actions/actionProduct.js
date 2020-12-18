import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetProducts = (data) => ({
  type: Types.SET_PRODUCT,
  payload: {
    data,
  },
});
export const handleAddProducts = (data) => ({
  type: Types.ADD_PRODUCT,
  payload: {
    data,
  },
});
export const handleEditProducts = (data) => ({
  type: Types.EDIT_PRODUCT,
  payload: {
    data,
  },
});
export const handleDeleteProducts = (data) => ({
  type: Types.DELETE_PRODUCT,
  payload: {
    data,
  },
});

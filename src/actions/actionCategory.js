import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetCategory = (data) => ({
  type: Types.SET_CATEGORY,
  payload: {
    data,
  },
});
export const handleEditCategory = (data) => ({
  type: Types.EDIT_CATEGORY,
  payload: {
    data,
  },
});
export const handleAddCategory = (data) => ({
  type: Types.ADD_CATEGORY,
  payload: {
    data,
  },
});
export const handleDeleteCategory = (data) => ({
  type: Types.DELETE_CATEGORY,
  payload: {
    data,
  },
});

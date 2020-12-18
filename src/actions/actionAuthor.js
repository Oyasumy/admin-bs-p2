import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetAuthor = (data) => ({
  type: Types.SET_AUTHOR,
  payload: {
    data,
  },
});
export const handleEditAuthor = (data) => ({
  type: Types.EDIT_AUTHOR,
  payload: {
    data,
  },
});
export const handleAddAuthor = (data) => ({
  type: Types.ADD_AUTHOR,
  payload: {
    data,
  },
});
export const handleDeleteAuthor = (data) => ({
  type: Types.DELETE_AUTHOR,
  payload: {
    data,
  },
});

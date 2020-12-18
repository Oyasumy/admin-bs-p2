import * as Types from "../constants/configRedux";

export const handleSetLoad = (load) => ({
  type: Types.SET_LOADING,
  payload: {
    load,
  },
});
export const handleSetCustomer = (data) => ({
  type: Types.SET_CUSTOMER,
  payload: {
    data,
  },
});
export const handleEditCustomer = (data) => ({
  type: Types.EDIT_CUSTOMER,
  payload: {
    data,
  },
});
export const handleAddCustomer = (data) => ({
  type: Types.ADD_CUSTOMER,
  payload: {
    data,
  },
});
export const handleDeleteCustomer = (data) => ({
  type: Types.DELETE_CUSTOMER,
  payload: {
    data,
  },
});

import * as Types from "../constants/configRedux";
const initialState = {
  data: [],
};

export default (state = initialState, { type, payload }) => {
  let index = -1;
  let newData = [];
  let newCustomer = {};
  switch (type) {
    case Types.SET_CUSTOMER:
      return { ...state, data: payload.data };
    case Types.EDIT_CUSTOMER:
      newCustomer = payload.data;
      // Find index
      index = findIndex(state.data, newCustomer);
      // Create new array
      if (index > 0) {
        newData = [...state.data.slice(0, index), newCustomer, ...state.data.slice(index + 1)];
      } else {
        newData = [newCustomer, ...state.data.slice(index + 1)];
      }
      // return new state
      return { ...state, data: newData };
    case Types.ADD_CUSTOMER:
      newCustomer = payload.data;
      console.log("new", newCustomer);
      // newData = state.data.concat(newCustomer);
      newData = [newCustomer, ...state.data];
      // return new state
      return { ...state, data: newData };

    case Types.DELETE_CUSTOMER:
      newCustomer = payload.data;
      // Find index
      index = findIndex(state.data, newCustomer);
      // Create new array
      if (index > 0) {
        newData = [...state.data.slice(0, index), ...state.data.slice(index + 1)];
      } else {
        newData = [ ...state.data.slice(index + 1)];
      }
      return { ...state, data: newData };
    default:
      return state;
  }
};

const findIndex = (array, newData) => {
  var result = -1;
  for (let i = 0; i < array.length; i++) {
    if (parseInt(newData.CustomerID) === parseInt(array[i].CustomerID)) {
      result = i;
    }
  }
  return result;
};

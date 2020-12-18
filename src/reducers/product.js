import * as Types from "../constants/configRedux";
const initialState = {
  data: [],
};

export default (state = initialState, { type, payload }) => {
  let index = -1;
  let newData = [];
  let newProduct = {};
  switch (type) {
    case Types.SET_PRODUCT:
      return { ...state, data: payload.data };
    case Types.EDIT_PRODUCT:
      newProduct = payload.data;
      // Find index
      index = findIndex(state.data, newProduct);
      // Create new array
      if (index > 0) {
        newData = [...state.data.slice(0, index), newProduct, ...state.data.slice(index + 1)];
      } else {
        newData = [newProduct, ...state.data.slice(index + 1)];
      }
      // return new state
      return { ...state, data: newData };
    case Types.ADD_PRODUCT:
      newProduct = payload.data;
      console.log("new", newProduct);
      // newData = state.data.concat(newProduct);
      newData = [newProduct, ...state.data];
      // return new state
      return { ...state, data: newData };

    case Types.DELETE_PRODUCT:
      newProduct = payload.data;
      // Find index
      index = findIndex(state.data, newProduct);
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
    if (parseInt(newData.ProductID) === parseInt(array[i].ProductID)) {
      result = i;
    }
  }
  return result;
};

import * as Types from "../constants/configRedux";
const initialState = {
  data: [],
};

export default (state = initialState, { type, payload }) => {
  let index = -1;
  let newData = [];
  let newCategory = {};
  switch (type) {
    case Types.SET_CATEGORY:
      return { ...state, data: payload.data };
    case Types.EDIT_CATEGORY:
      newCategory = payload.data;
      // Find index
      index = findIndex(state.data, newCategory);
      // Create new array
      if (index > 0) {
        newData = [...state.data.slice(0, index), newCategory, ...state.data.slice(index + 1)];
      } else {
        newData = [newCategory, ...state.data.slice(index + 1)];
      }
      // return new state
      return { ...state, data: newData };
    case Types.ADD_CATEGORY:
      newCategory = payload.data;
      console.log("new", newCategory);
      // newData = state.data.concat(newCategory);
      newData = [newCategory, ...state.data];
      // return new state
      return { ...state, data: newData };

    case Types.DELETE_CATEGORY:
      newCategory = payload.data;
      // Find index
      index = findIndex(state.data, newCategory);
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
    if (parseInt(newData.CategoryID) === parseInt(array[i].CategoryID)) {
      result = i;
    }
  }
  return result;
};

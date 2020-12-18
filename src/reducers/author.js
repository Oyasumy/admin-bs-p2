import * as Types from "../constants/configRedux";
const initialState = {
  data: [],
};

export default (state = initialState, { type, payload }) => {
  let index = -1;
  let newData = [];
  let newAuthor = {};
  switch (type) {
    case Types.SET_AUTHOR:
      return { ...state, data: payload.data };
    case Types.EDIT_AUTHOR:
      newAuthor = payload.data;
      // Find index
      index = findIndex(state.data, newAuthor);
      // Create new array
      if (index > 0) {
        newData = [...state.data.slice(0, index), newAuthor, ...state.data.slice(index + 1)];
      } else {
        newData = [newAuthor, ...state.data.slice(index + 1)];
      }
      // return new state
      return { ...state, data: newData };
    case Types.ADD_AUTHOR:
      newAuthor = payload.data;
      console.log("new", newAuthor);
      // newData = state.data.concat(newAuthor);
      newData = [newAuthor, ...state.data];
      // return new state
      return { ...state, data: newData };

    case Types.DELETE_AUTHOR:
      newAuthor = payload.data;
      // Find index
      index = findIndex(state.data, newAuthor);
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
    if (parseInt(newData.AuthorID) === parseInt(array[i].AuthorID)) {
      result = i;
    }
  }
  return result;
};

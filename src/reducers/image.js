import * as Types from "../constants/configRedux";
const initialState = {
  data: [],
};

export default (state = initialState, { type, payload }) => {
  let index = -1;
  let newData = [];
  let newImage = {};
  switch (type) {
    case Types.SET_IMAGE:
      return { ...state, data: payload.data };
    case Types.ADD_IMAGE:
      newImage = payload.data;
      console.log("new", newImage);
      // newData = state.data.concat(newImage);
      newData = [newImage, ...state.data];
      // return new state
      return { ...state, data: newData };

    case Types.DELETE_IMAGE:
      newImage = payload.data;
      // Find index
      index = findIndex(state.data, newImage);
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
    if (parseInt(newData.idimages) === parseInt(array[i].idimages)) {
      result = i;
    }
  }
  return result;
};

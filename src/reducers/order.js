import * as Types from "../constants/configRedux";
const initialState = {
  data: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_ORDER:
      return { ...state, data: payload.data };
    default:
      return state;
  }
};
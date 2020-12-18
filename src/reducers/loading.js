import * as Types from "../constants/configRedux";
const initialState = {
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_LOADING:
      return { ...state, isLoading: payload.load };

    default:
      return state;
  }
};

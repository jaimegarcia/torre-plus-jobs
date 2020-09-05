export const initialState = {
  expression: "",
  page: 1,
  searching: false,
};

export default function queryReducer(state = initialState, action) {
  switch (action.type) {
    case "EXPRESSION":
      return { ...state, expression: action.payload, searching: true };
    case "CLEAR":
      return {
        page: 1,
        expression: "",
        searching: false,
      };
    case "PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

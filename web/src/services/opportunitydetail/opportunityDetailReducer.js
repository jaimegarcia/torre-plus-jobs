import * as actions from "./opportunityDetailActions";

export const initialState = {
  opportunity: null,
  loading: false,
  hasErrors: false,
};

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_OPPORTUNITY:
      return { ...state, loading: true };
    case actions.GET_OPPORTUNITY_SUCCESS:
      return { ...state, loading: false, opportunity: action.payload };
    case actions.GET_OPPORTUNITY_FAILURE:
      return { ...state, hasErrors: true, loading: false };
    case actions.CLEAR_OPPORTUNITY:
      return { opportunity: null, hasErrors: false, loading: false };
    default:
      return state;
  }
}

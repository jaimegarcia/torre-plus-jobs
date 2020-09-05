// Import all actions
import * as actions from "./opportunitiesActions";

export const initialState = {
  opportunities: [],
  loading: false,
  hasErrors: false,
  current: [],
  globalPage: 0,
  total:0
};

export default function opportunitiesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_OPPORTUNITIES:
      return { ...state, loading: true };
    case actions.GET_OPPORTUNITIES_SUCCESS:
      let opportunities = [...state.opportunities];
      //console.log("opportunitiespayload",action.payload.results)
      opportunities.push(action.payload.opportunities);
      return { ...state, loading: false, hasErrors: false, opportunities,total:action.payload.total };
    case actions.GET_OPPORTUNITIES_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    case actions.GET_CURRENT_OPPORTUNITIES:
      console.log("sate.opportunities",state.opportunities)
      return {
        ...state,
        current:
          state.opportunities.length >= action.payload.globalPage
            ? state.opportunities[action.payload.globalPage - 1].slice(
                action.payload.start,
                action.payload.end
              )
            : [],
      };
    case actions.SET_GLOBAL_PAGE:
      return { ...state, globalPage: action.payload };
    case actions.CLEAR_OPPORTUNITIES:
      return { ...state, opportunities: [], globalPage: 1 };
    default:
      return state;
  }
}
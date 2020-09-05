// Import all actions
import * as actions from "./mentorsActions";

export const initialState = {
  mentors: [],
  loading: false,
  hasErrors: false,
  current: [],
  globalPage: 0,
  total:0,
  selectedMentor:null
};

export default function mentorsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_MENTORS:
      return { ...state, loading: true };
    case actions.GET_MENTORS_SUCCESS:
      let mentors = [...state.mentors];
      //console.log("mentorspayload",action.payload.results)
      mentors.push(action.payload.mentors);
      return { ...state, loading: false, hasErrors: false, mentors,total:action.payload.total };
    case actions.GET_MENTORS_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    case actions.GET_CURRENT_MENTORS:
      console.log("sate.mentors",state.mentors)
      return {
        ...state,
        current:
          state.mentors.length >= action.payload.globalPage
            ? state.mentors[action.payload.globalPage - 1].slice(
                action.payload.start,
                action.payload.end
              )
            : [],
      };
    case actions.SET_GLOBAL_PAGE:
      return { ...state, globalPage: action.payload };
    case actions.SELECT_MENTOR:
      return { ...state, selectedMentor: action.payload };
      case actions.CLEAR_SELECTED_MENTOR:
        return { ...state, selectedMentor: null };
    case actions.CLEAR_MENTORS:
      return { ...state, mentors: [], globalPage: 1 };
    default:
      return state;
  }
}
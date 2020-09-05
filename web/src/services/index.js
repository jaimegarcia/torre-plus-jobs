import { combineReducers } from "redux";

import queryReducer from "./query/queryReducer";
import opportunitiesReducer from "./opportunities/opportunitiesReducer";
import opportunityDetailReducer from "./opportunitydetail/opportunityDetailReducer";
import mentorsReducer from "./mentors/mentorsReducer";

const rootReducer = combineReducers({
  query: queryReducer,
  opportunities: opportunitiesReducer,
  opportunityDetail: opportunityDetailReducer,
  mentors:mentorsReducer
});

export default rootReducer;

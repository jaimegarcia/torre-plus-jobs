import { combineReducers } from "redux";

import queryReducer from "./query/queryReducer";
import opportunitiesReducer from "./opportunities/opportunitiesReducer";

const rootReducer = combineReducers({
  query: queryReducer,
  opportunities: opportunitiesReducer
});

export default rootReducer;

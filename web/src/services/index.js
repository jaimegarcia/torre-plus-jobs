import { combineReducers } from "redux";

import queryReducer from "./query/queryReducer";

const rootReducer = combineReducers({
  query: queryReducer,
});

export default rootReducer;

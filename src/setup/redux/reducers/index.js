import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  news: newsReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import { registerUserReducer } from "./userReducer";

const rootReducer = combineReducers({
    registerUserReducer: registerUserReducer
});

export default rootReducer;
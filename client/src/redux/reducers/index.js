import { combineReducers } from "redux";
import { registerUserSendMailReducer, registerUserReducer } from "./userReducer";

const rootReducer = combineReducers({
    registerUserSendMailReducer: registerUserSendMailReducer,
    registerUserReducer: registerUserReducer
});

export default rootReducer;
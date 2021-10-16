import { combineReducers } from "redux";
import { registerUserSendMailReducer, registerUserVerifyOTPReducer, registerUserReducer } from "./userReducer";

const rootReducer = combineReducers({
    registerUserSendMailReducer: registerUserSendMailReducer,
    registerUserVerifyOTPReducer: registerUserVerifyOTPReducer
});

export default rootReducer;
import { combineReducers } from "redux";
import { signupSchoolAuthReducer } from "./schoolAuthReducer";

const rootReducer = combineReducers({
    signupSchoolAuthReducer: signupSchoolAuthReducer
});

export default rootReducer;
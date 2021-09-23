import { constants } from "../constants"

export const signupSchoolAuthReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.SCHOOL_USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case constants.SCHOOL_USER_REGISTER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case constants.SCHOOL_USER_REGISTER_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

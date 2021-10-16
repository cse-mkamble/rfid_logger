import { constants } from "../constants"

export const registerUserSendMailReducer = (state = {
    loading: false,
    success: false,
    message: '',
    error: ''
}, action) => {
    switch (action.type) {
        case constants.USER_REGISTER_SEND_MAIL_REQUEST:
            return {
                loading: true
            }
        case constants.USER_REGISTER_SEND_MAIL_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case constants.USER_REGISTER_SEND_MAIL_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const registerUserVerifyOTPReducer = (state = {
    loading: false,
    success: false,
    message: '',
    error: ''
}, action) => {
    switch (action.type) {
        case constants.USER_REGISTER_VERIFY_OTP_REQUEST:
            return {
                loading: true
            }
        case constants.USER_REGISTER_VERIFY_OTP_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload
            }
        case constants.USER_REGISTER_VERIFY_OTP_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const registerUserReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case constants.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case constants.USER_REGISTER_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

import axios from "axios"
import { constants } from "../constants"

export const registerSendMailAction = (data) => async (dispatch) => {
    const { owner_name, school_name, school_email, school_phone, address, city, region, country, password, confirm_password } = data;
    let state = [];
    let success = false;
    let message = '';
    let errorMessage = '';
    dispatch({ type: constants.USER_REGISTER_SEND_MAIL_REQUEST });
    try {
        const response = await axios.post(`/api/v1/users/school/registersendmail`, { owner_name, school_name, school_email, school_phone, address, city, region, country, password, confirm_password });
        dispatch({ type: constants.USER_REGISTER_SEND_MAIL_SUCCESS, payload: response.data.success, payload: response.data.message });
        success = response.data.success;
        message = response.data.message;
    } catch (error) {
        if (error.response) {
            dispatch({ type: constants.USER_REGISTER_SEND_MAIL_FAILED, payload: error.response.data.errors[0].message })
            errorMessage = error.response.data.errors[0].message;
        } else {
            dispatch({ type: constants.USER_REGISTER_SEND_MAIL_FAILED, payload: "Somthing went wrong!" })
            errorMessage = "Somthing went wrong!";
        }
    }
    return state = {
        success: success,
        error: errorMessage,
        message: message
    }
}

export const register = (user) => {
    return dispatch => {
        dispatch({ type: constants.USER_REGISTER_REQUEST })
        try {
            console.log(user)
            // const response = await axios.post(`/api/v1/users/register`, { school_name: schoolName, school_email: schoolEmail, school_phone: schoolPhone, address, city, region, country, password, confirm_password: confirmPassword })
            dispatch({ type: constants.USER_REGISTER_SUCCESS })
        } catch (error) {
            dispatch({ type: constants.USER_REGISTER_FAILED, payload: error })
        }
    }
}

// export const loginUser = (user) => async dispatch => {
//     dispatch({ type: constants.USER_LOGIN_REQUEST })
//     try {
//         const res = await axios.post(`/api/user/login`, { user })
//         dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: res.data })
//         localStorage.setItem('user', JSON.stringify(res.data.user))
//         window.location.href = '/'
//     } catch (error) {
//         dispatch({ type: constants.USER_LOGIN_FAILED, payload: error })
//     }
// }


// export const logoutUser = (user) => async dispatch => {
//     localStorage.removeItem('user')
//     window.location.href = '/'
// }

// export const getAllUser = () => async dispatch => {
//     dispatch({ type: constants.GET_ALL_USER_REQUEST })
//     try {
//         const res = await axios.get(`/api/user/getallusers`)
//         dispatch({ type: constants.GET_ALL_USER_SUCCESS, payload: res.data })
//     } catch (error) {
//         dispatch({ type: constants.GET_ALL_USER_FAILED, payload: error })
//     }
// }

// export const deleteUser = (userId) => async dispatch => {
//     try {
//         const res = await axios.post(`/api/user/deleteuser`, { userId })
//         alert('User Delete Successfully.')
//         window.location.reload()
//     } catch (error) {
//         alert('Something went wrong.')
//     }
// }
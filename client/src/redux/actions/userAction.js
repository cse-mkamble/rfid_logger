import axios from "axios"
import { constants } from "../constants"

export const registerSendMail = (user) => {
    return dispatch => {
        dispatch({ type: constants.USER_REGISTER_SEND_MAIL_REQUEST })
        try {
            console.log(user)
            // const response = await axios.post(`/api/v1/users/register`, { school_name: schoolName, school_email: schoolEmail, school_phone: schoolPhone, address, city, region, country, password, confirm_password: confirmPassword })
            dispatch({ type: constants.USER_REGISTER_SEND_MAIL_SUCCESS })
        } catch (error) {
            dispatch({ type: constants.USER_REGISTER_SEND_MAIL_FAILED, payload: error })
        }
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
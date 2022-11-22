import axios from 'axios';
import { REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
UPDATE_PROFILE_SUCCESS,
UPDATE_PROFILE_FAIL,
UPDATE_PROFILE_RESET,
UPDATE_PASSWORD_REQUEST,
UPDATE_PASSWORD_SUCCESS,
UPDATE_PASSWORD_FAIL,
UPDATE_PASSWORD_RESET,
ALL_USERS_REQUEST,
ALL_USERS_SUCCESS,
ALL_USERS_FAIL,
UPDATE_FRIEND_REQUEST,
UPDATE_FRIEND_SUCCESS,
UPDATE_FRIEND_FAIL,
MYFRIEND_REQUEST,
MYFRIEND_SUCCESS,
MYFRIEND_FAIL,

CLEAR_ERRORS} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', { email, password }, config)

        dispatch ({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        
        dispatch({
            
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const register = (userData) => async (dispatch) => {
    
    try {

        dispatch({ type: REGISTER_USER_REQUEST })
        

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
    
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
        

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadmyfriends = () => async (dispatch) => {
    try {

        dispatch({ type: MYFRIEND_REQUEST })

        const { data } = await axios.get('/api/v1/myfriends')
    

        dispatch({
            type: MYFRIEND_SUCCESS,
            payload: data.friendList
        })
        

    } catch (error) {
        dispatch({
            type: MYFRIEND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/v1/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addFriend = (id,details) => async (dispatch) => {
    

    try {

        dispatch({ type: UPDATE_FRIEND_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
     

        const { data } = await axios.put(`/api/v1/addfriend/${id}`,details, config)

        dispatch({
            type: UPDATE_FRIEND_SUCCESS,
            payload: data.success
        })
        

    } catch (error) {
        dispatch({
            type: UPDATE_FRIEND_FAIL,
            payload: error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

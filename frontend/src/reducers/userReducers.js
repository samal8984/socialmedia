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
UPDATE_FRIEND_RESET,
MYFRIEND_REQUEST,
MYFRIEND_SUCCESS,
MYFRIEND_FAIL,
CLEAR_ERRORS } from "../constants/userConstants";

export const authReducer = (state= {user:{} },action) =>{
    switch(action.type){

        case REGISTER_USER_REQUEST:
            case LOAD_USER_REQUEST:
            

            return {
                loading: true,
                isAuthenticated: false,

        }
        case LOGIN_REQUEST:
            return {
                loading: true,
                loginAuthenticated: false,

        }
        
        case REGISTER_USER_SUCCESS:
            case LOAD_USER_SUCCESS:
                
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
            case LOGIN_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    loginAuthenticated: true,
                    user: action.payload
                }
                case LOGOUT_SUCCESS:
                    return {
                        loading: false,
                        loginAuthenticated: false,
                        user: null
                    }
            case REGISTER_USER_FAIL:
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
                }
                case LOGIN_FAIL:
                    return {
                        ...state,
                        loading: false,
                        loginAuthenticated: false,
                        user: null,
                        loginerror: action.payload
                    }
                    case LOGOUT_FAIL:
                        return {
                            ...state,
                            error: action.payload
                        }
                    case LOAD_USER_FAIL:
                        
                        return {
                            loading: false,
                            isAuthenticated: false,
                            user: null,
                            error: action.payload
                        }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error: null,
                        loginerror: null
                    }


        default:
            return state
    }
}

export const friendReducer = (state = {friends:[]}, action) => {
    switch (action.type) {

       
      
            case MYFRIEND_REQUEST:
       
                return {
                    ...state,
                    loading: true
                }
    

            case MYFRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                  friends : action.payload
            }
      
     

       

            case MYFRIEND_FAIL:
                return {
                    ...state,
                    loading: false,
                   error: action.payload
                }
       

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                
            }

        default:
            return state;
    }
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
            case UPDATE_FRIEND_REQUEST:
                return {
                    ...state,
                    loading: true
                }
        case UPDATE_PASSWORD_REQUEST:
       
            return {
                ...state,
                loading: true
            }
          
    

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
            
        case UPDATE_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                friendUpdated: action.payload
            }
           
        case UPDATE_PASSWORD_SUCCESS:
       
            return {
                ...state,
                loading: false,
                passUpdated: action.payload
            }

      

        case UPDATE_PROFILE_RESET:
            
            return {
                ...state,
                isUpdated: false
            }
        case UPDATE_PASSWORD_RESET:
        
            return {
                ...state,
                passUpdated: false
            }
            case UPDATE_FRIEND_RESET:
        
                return {
                    ...state,
                    friendUpdated: false
                }
          

     

        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case UPDATE_FRIEND_FAIL:
                return {
                    ...state,
                    loading: false,
                      frienderror: action.payload
                }
    

        
        case UPDATE_PASSWORD_FAIL:
       
            return {
                ...state,
                loading: false,
                passerror: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                passerror: null,
                frienderror: null
            }

        default:
            return state;
    }
}


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
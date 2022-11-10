import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { allUsersReducer, authReducer, friendReducer, userReducer } from './reducers/userReducers';


const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    allUsers:allUsersReducer,
    friend: friendReducer


})
const middleware= [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
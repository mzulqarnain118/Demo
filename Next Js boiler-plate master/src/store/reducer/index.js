import {combineReducers} from "redux";
import userLoggedInReducer from './loggedin_reducer';

const rootReducer = combineReducers({
    isLogin: userLoggedInReducer,
});

export default rootReducer;

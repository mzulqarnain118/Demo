import { ADD_LOGIN } from "store/action/actionTypes";

const INITIAL_STATE = false

const fetchUserIsLoggedIn = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {

        case ADD_LOGIN:
            return action.login;
        
        default:
            return state;
    }
};

export default fetchUserIsLoggedIn;
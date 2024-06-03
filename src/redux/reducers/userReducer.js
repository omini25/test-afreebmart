import { USER_LOGIN, USER_SIGNUP, USER_LOGOUT } from './../actions/userActionTypes.js';

const initialState = {
    loading: false,
    user: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true };
        case 'USER_LOGIN':
            return { user: action.payload };
        case 'USER_SIGNUP':
            return {
                ...state,
                user: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default userReducer;
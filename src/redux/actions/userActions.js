import { USER_LOGIN, USER_SIGNUP, USER_LOGOUT } from './userActionTypes';


export const userLogin = () => {
    return async (dispatch) => {
        // Get user data from session
        const sessionData = sessionStorage.getItem('user');
        if (!sessionData) {
            throw new Error('No user session found');
        }

        const userData = JSON.parse(sessionData);

        // Dispatch the user data to the Redux store
        dispatch({
            type: USER_LOGIN,
            payload: userData
        });
    };
};

export const userSignup = (user) => ({
    type: 'USER_SIGNUP',
    payload: user
});

export const logout = () => ({
    type: USER_LOGOUT
});

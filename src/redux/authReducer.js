import { authApi } from '../api/api';

const SET_AUTH = 'SET_AUTH';
const SET_ERROR = 'SET_ERROR';
const initialState = {
    isAuth: true,
    errorAuth: '',
};

const setAuthSuccess = () => {
    return {
        type: SET_AUTH,
    };
};
const setErrorSuccess = (error) => {
    return {
        type: SET_ERROR,
        error,
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return { ...state, isAuth: true };
        }
        case SET_ERROR: {
            return { ...state, errorAuth: action.error };
        }
        default:
            return state;
    }
};

const setAuth = (login, pas) => {
    return async (dispatch) => {
        let res = await authApi.login(login, pas);
        if (res.data.status) {
            dispatch(setAuthSuccess());
        } else {
            dispatch(setErrorSuccess(res.data.description));
        }
    };
};

export { authReducer, setAuth };

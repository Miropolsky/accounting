import { authApi } from '../api/api';

const SET_AUTH = 'SET_AUTH';
const initialState = {
    isAuth: false,
};

const setAuthSuccess = () => {
    return {
        type: SET_AUTH,
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return { ...state, isAuth: true };
        }
        default:
            return state;
    }
};

const setAuth = (login, pas) => {
    return async (dispatch) => {
        // let res = await authApi.login(login, pas);
        // res.then((res) => console.log(res));

        console.log(login, pas);
        dispatch(setAuthSuccess());
    };
};

export { authReducer, setAuth };

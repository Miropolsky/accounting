const SET_AUTH = 'SET_AUTH';
const initialState = {
    isAuth: false,
};

const setAuthSuccess = () => {
    return {
        type: SET_AUTH,
    };
};

const informationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return { ...state, isAuth: true };
        }
        default:
            return state;
    }
};

const setAuth = () => {
    return async (dispatch) => {
        let res = await peopleApi.getPeople();
        res.then((res) => console.log(res));
        dispatch(setAuthSuccess());
    };
};

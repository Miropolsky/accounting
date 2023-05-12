import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
    compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
const { informationReducer } = require('./informationReducer');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        informationPage: informationReducer,
    }),
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;

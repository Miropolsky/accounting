const { combineReducers, legacy_createStore } = require('redux');
const { informationReducer } = require('./informationReducer');

const store = legacy_createStore(
    combineReducers({
        informationPage: informationReducer,
    })
);

export default store;

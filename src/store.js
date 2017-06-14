import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger as logger } from 'redux-logger';
import testReducer from './reducers/testReducer.js';
import userReducer from './reducers/userReducer.js';

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

export default createStore(
    combineReducers({
    	testReducer, userReducer
    }), 
    {}, 
    applyMiddleware(logger(), thunk, promise())
);
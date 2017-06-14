import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger as logger } from 'redux-logger';
import userReducer from './reducers/userReducer.js';

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

export default createStore(
    combineReducers({
    	userReducer
    }), 
    {}, 
    applyMiddleware(logger(), thunk, promise())
);
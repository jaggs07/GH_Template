import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger as logger } from 'redux-logger';
import userReducer from './reducers/userReducer.js';
import jobReducer from './reducers/jobReducer.js';
import employerReducer from './reducers/employerReducer.js';

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

export default createStore(
    combineReducers({
    	userReducer, jobReducer, employerReducer
    }), 
    {}, 
    applyMiddleware(logger(), thunk, promise())
);
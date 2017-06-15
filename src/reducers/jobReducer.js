import {INITIAL_STATE} from '../model';

import {
    FETCH_JOBS, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE,
    RESET_JOBS_DATA,
    SET_BOARD_TOKEN,SET_COMPANY_NAME
} from '../actions/jobActions'

const jobReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCH_JOBS:
            state = {
                ...state,
                job: {
                    ...state.job,
                    loading: action.loading
                }
            };
            break;

        case FETCH_JOBS_SUCCESS:
            state = {
                ...state,
                job: {
                    ...state.job,
                    data: action.data,
                    loading: action.loading
                }
            };
            break;

        case FETCH_JOBS_FAILURE:
            state = {
                ...state,
                job: {
                    ...state.job,
                    loading: action.loading,
                    error: action.error
                }
            };
            break;

        case RESET_JOBS_DATA:
             state = {
                ...state,
                job: {
                    ...state.job,
                    loading: false,
                    data: [],
                    error: {}
                }
            };
            break;

        case SET_BOARD_TOKEN: 
            state = {
                ...state,
                job: {
                    ...state.job,
                    boardToken: action.boardToken
                }
            };
            break;

        case SET_COMPANY_NAME: 
            state = {
                ...state,
                job: {
                    ...state.job,
                    companyName: action.companyName
                }
            };
            break;

        default:
            state = {
                ...state
            }
    }
    return state;
};

export default jobReducer;;
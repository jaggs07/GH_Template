import {INITIAL_STATE} from '../model';

import {
    RESET_JOBS_DATA
} from '../actions/jobActions'

const jobReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

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

        default:
            state = {
                ...state
            }
    }
    return state;
};

export default jobReducer;;
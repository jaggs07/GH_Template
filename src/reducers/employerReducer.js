import {INITIAL_STATE} from '../model';

import {
    RESET_EMPLOYER_DATA
} from '../actions/employerActions'

const employerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

         case RESET_EMPLOYER_DATA: 
            state = {
                ...state,
                employer: {
                    ...state.employer,
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

export default employerReducer;;
import {INITIAL_STATE} from '../model';

import {
    TEST_FETCH
} from '../actions/testAction'

const testReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case TEST_FETCH:
            state = {
                ...state,
                test: {
                    ...state.test,
                    loading: action.loading
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

export default testReducer;;
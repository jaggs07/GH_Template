import {INITIAL_STATE} from '../model';

import {
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions/userActions'

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN:
            state = {
                ...state,
                user: {
                    ...state.user,
                    loading: action.loading
                }
            };
            break;


        case LOGIN_SUCCESS:
            state = {
                ...state,
                user: {
                    ...state.user,
                    data: action.data,
                    loading: action.loading
                }
            };

            break;

        case LOGIN_FAILURE:
            state = {
                ...state,
                user: {
                    ...state.user,
                    error: action.error,
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

export default userReducer;
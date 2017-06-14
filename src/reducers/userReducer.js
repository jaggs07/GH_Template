import {INITIAL_STATE} from '../model';

import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    USER_INFO, USER_INFO_SUCCESS, USER_INFO_FAILURE,
    RESET_USER
} from '../actions/userActions'

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case REGISTER:
            state = {
                ...state,
                user: {
                    ...state.user,
                    loading: action.loading
                }
            };
            break;


        case REGISTER_SUCCESS:
            state = {
                ...state,
                user: {
                    ...state.user,
                    data: action.data,
                    loading: action.loading
                }
            };

            break;

        case REGISTER_FAILURE:
            state = {
                ...state,
                user: {
                    ...state.user,
                    error: action.error,
                    loading: action.loading
                }
            };
            break;

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

         case USER_INFO:
            state = {
                ...state,
                user: {
                    ...state.user,
                    loading: action.loading
                }
            };
            break;


        case USER_INFO_SUCCESS:
            state = {
                ...state,
                user: {
                    ...state.user,
                    detail: action.detail,
                    loading: action.loading
                }
            };

            break;

        case USER_INFO_FAILURE:
            state = {
                ...state,
                user: {
                    ...state.user,
                    error: action.error,
                    loading: action.loading
                }
            };
            break;

        case RESET_USER:
          state = {
            ...state,
              user: {
                  ...state.user,
                  loading: action.loading,
                  error: action.error,
                  updateSuccess: action.updateSuccess,
                  passwordChangeSuccess: action.passwordChangeSuccess
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

export default userReducer;;
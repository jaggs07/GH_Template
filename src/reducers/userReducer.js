import {INITIAL_STATE} from '../model';

import {
  REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
  USER_INFO, USER_INFO_SUCCESS, USER_INFO_FAILURE,
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  REMOVE_USER, REMOVE_USER_SUCCESS, REMOVE_USER_FAILURE,
  UPDATE_USER_ACCOUNT, UPDATE_USER_ACCOUNT_SUCCESS, UPDATE_USER_ACCOUNT_FAILURE,
  CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
  RESET_USER_DATA, RESET_USER, RESET_ERROR_MESSAGE
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


      case CREATE_USER:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;


      case CREATE_USER_SUCCESS:
        state = {
          ...state,
          user: {
            ...state.user,
            data: [...state.user.data, action.user],
            loading: action.loading
          }
        };

        break;

      case CREATE_USER_FAILURE:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;

        case FETCH_USERS:
            state = {
                ...state,
                user: {
                    ...state.user,
                    loading: action.loading
                }
            };
            break;

        case FETCH_USERS_SUCCESS:
            state = {
                ...state,
                user: {
                    ...state.user,
                    data: action.data,
                    loading: action.loading
                }
            };
            break;

        case FETCH_USERS_FAILURE:
            state = {
                ...state,
                user: {
                    ...state.user,
                    loading: action.loading,
                    error: action.error
                }
            };
            break;

      case UPDATE_USER:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;

      case UPDATE_USER_SUCCESS:

        var updatedUser = updateObjectInArray(state.user.data, action);

        state = {
          ...state,
          user: {
            ...state.user,
            data: updatedUser,
            loading: action.loading
          }
        };
        break;

      case UPDATE_USER_FAILURE:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;


      case REMOVE_USER:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };

        break;

      case REMOVE_USER_SUCCESS:

        var newUser = removeItem(state.user.data, action);

        state = {
          ...state,
          user: {
            ...state.user,
            data: newUser,
            loading: action.loading
          }
        };
        break;

      case REMOVE_USER_FAILURE:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;

      case UPDATE_USER_ACCOUNT:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;

      case UPDATE_USER_ACCOUNT_SUCCESS:

        state = {
          ...state,
          user: {
            ...state.user,
            detail: action.user,
            updateSuccess: action.updateSuccess,
            loading: action.loading
          }
        };
        break;

      case UPDATE_USER_ACCOUNT_FAILURE:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;

      case CHANGE_PASSWORD:
        state = {
          ...state,
          user: {
            ...state.user,
            loading: action.loading
          }
        };
        break;

      case CHANGE_PASSWORD_SUCCESS:

        state = {
          ...state,
          user: {
            ...state.user,
            detail: action.user,
            passwordChangeSuccess: action.passwordChangeSuccess,
            loading: action.loading
          }
        };
        break;

      case CHANGE_PASSWORD_FAILURE:
        state = {
          ...state,
          user: {
            ...state.user,
            passwordChangeSuccess: action.passwordChangeSuccess,
            error: action.error,
            loading: action.loading
          }
        };

        break;


        case RESET_USER_DATA:
          state = {
            ...state,
              user: {
                  ...state.user,
                  loading: false,
                  data: {},
                  error: {},
                  detail: {},
                  updateSuccess: false,
                  passwordChangeSuccess: false

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

        case RESET_ERROR_MESSAGE: 
            state = {
                ...state,
                user: {
                    ...state.user,
                    error: action.error
                }
            }
          break;

        default:
            state = {
                ...state
            }
          break;

    }
    return state;
};

function removeItem(array, action) {
  return array.filter( (item) => item.id !== action.user.id)
}

function updateObjectInArray(array, action) {

  return array.map( (item) => item.id !== action.user.id ? item : action.user);
}

export default userReducer;
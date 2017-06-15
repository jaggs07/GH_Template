import {INITIAL_STATE} from '../model';

import {
    FETCH_EMPLOYERS, FETCH_EMPLOYERS_SUCCESS, FETCH_EMPLOYERS_FAILURE,
    SAVE_EMPLOYER, SAVE_EMPLOYER_SUCCESS, SAVE_EMPLOYER_FAILURE,
    REMOVE_EMPLOYER, REMOVE_EMPLOYER_SUCCESS, REMOVE_EMPLOYER_FAILURE,
    UPDATE_EMPLOYER, UPDATE_EMPLOYER_SUCCESS, UPDATE_EMPLOYER_FAILURE,
    REFRESH_EMPLOYER, REFRESH_EMPLOYER_SUCCESS, REFRESH_EMPLOYER_FAILURE,
    REFRESH_ALL_EMPLOYER, REFRESH_ALL_EMPLOYER_SUCCESS, REFRESH_ALL_EMPLOYER_FAILURE,
    RESET_EMPLOYER_DATA
} from '../actions/employerActions'

const employerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

         case FETCH_EMPLOYERS:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;

        case FETCH_EMPLOYERS_SUCCESS:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    data: action.data,
                    loading: action.loading
                }
            };
            break;

        case FETCH_EMPLOYERS_FAILURE:
            state = {
                ...state,
                employer: {
                    ...state.employerclient,
                    loading: action.loading
                }
            };
            break;

        case SAVE_EMPLOYER:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;


        case SAVE_EMPLOYER_SUCCESS:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    data: [...state.employer.data, action.employer],
                    loading: action.loading
                }
            };

            break;

        case SAVE_EMPLOYER_FAILURE:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;

        case REMOVE_EMPLOYER:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };

            break;

        case REMOVE_EMPLOYER_SUCCESS:

            var newEmployer = removeItem(state.employer.data, action);

            state = {
                ...state,
                employer: {
                    ...state.employer,
	                data: newEmployer,
                    loading: action.loading
                }
            };
            break;

        case REMOVE_EMPLOYER_FAILURE:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;

        case UPDATE_EMPLOYER:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;

        case UPDATE_EMPLOYER_SUCCESS:

	        var updatedEmployer = updateObjectInArray(state.employer.data, action);

            state = {
                ...state,
                employer: {
                    ...state.employer,
                    data: updatedEmployer,
                    loading: action.loading
                }
            };
            break;

        case UPDATE_EMPLOYER_FAILURE:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;

        case REFRESH_EMPLOYER:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;

        case REFRESH_EMPLOYER_SUCCESS:

	        var refreshedEmployer = updateObjectInArray(state.employer.data, action);

            state = {
                ...state,
                employer: {
                    ...state.employer,
                    data: refreshedEmployer,
                    loading: action.loading
                }
            };
            break;

        case REFRESH_EMPLOYER_FAILURE:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                    }
            };
        break;

        case REFRESH_ALL_EMPLOYER:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;

        case REFRESH_ALL_EMPLOYER_SUCCESS:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    data: action.data,
                    loading: action.loading
                }
            };
            break;

        case REFRESH_ALL_EMPLOYER_FAILURE:
            state = {
                ...state,
                employer: {
                    ...state.employer,
                    loading: action.loading
                }
            };
            break;    

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

function removeItem(array, action) {
	return array.filter( (item) => item.id !== action.employer.id)
}

function updateObjectInArray(array, action) {

    return array.map( (item) => item.id !== action.employer.id ? item : action.employer);
}

export default employerReducer;;
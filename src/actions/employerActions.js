export const FETCH_EMPLOYERS = "FETCH_EMPLOYERS";
export const FETCH_EMPLOYERS_SUCCESS = "FETCH_EMPLOYERS_SUCCESS";
export const FETCH_EMPLOYERS_FAILURE = "FETCH_EMPLOYERS_FAILURE";

export const SAVE_EMPLOYER = "SAVE_EMPLOYER";
export const SAVE_EMPLOYER_SUCCESS = "SAVE_EMPLOYER_SUCCESS";
export const SAVE_EMPLOYER_FAILURE = "SAVE_EMPLOYER_FAILURE";

export const REMOVE_EMPLOYER = "REMOVE_EMPLOYER";
export const REMOVE_EMPLOYER_SUCCESS = "REMOVE_EMPLOYER_SUCCESS";
export const REMOVE_EMPLOYER_FAILURE = "REMOVE_EMPLOYER_FAILURE";

export const UPDATE_EMPLOYER = "UPDATE_EMPLOYER";
export const UPDATE_EMPLOYER_SUCCESS = "UPDATE_EMPLOYER_SUCCESS";
export const UPDATE_EMPLOYER_FAILURE = "UPDATE_EMPLOYER_FAILURE";

export const REFRESH_EMPLOYER = "REFRESH_EMPLOYER";
export const REFRESH_EMPLOYER_SUCCESS = "REFRESH_EMPLOYER_SUCCESS";
export const REFRESH_EMPLOYER_FAILURE = "REFRESH_EMPLOYER_FAILURE";

export const REFRESH_ALL_EMPLOYER = "REFRESH_ALL_EMPLOYER";
export const REFRESH_ALL_EMPLOYER_SUCCESS = "REFRESH_ALL_EMPLOYER_SUCCESS";
export const REFRESH_ALL_EMPLOYER_FAILURE = "REFRESH_ALL_EMPLOYER_FAILURE";

export const RESET_EMPLOYER_DATA = "RESET_EMPLOYER_DATA";

const ROOT_URL = window.location.hostname === 'localhost' ? 'http://localhost:8090/api/' : 'http://54.234.23.64:8090/api/';


export function fetchEmployers(token) {

    return function (dispatch) {

        dispatch({type: FETCH_EMPLOYERS, loading: true})

        return fetch(ROOT_URL+'employer', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                dispatch(fetchEmployersSuccess(responseData))
            })
            .catch((error) => {
                dispatch(fetchEmployersFailure(error))
            });
    }
}

export function fetchEmployersSuccess(employers) {

    return function (dispatch) {

        if (employers.length > 0) {

            dispatch({type: FETCH_EMPLOYERS_SUCCESS, data: employers, loading: false})
        } else {

            dispatch({type: FETCH_EMPLOYERS_SUCCESS, data: employers, loading: false})
        }
    }
}

export function fetchEmployersFailure(error) {
    return {
        type: FETCH_EMPLOYERS_FAILURE, loading: false
    };
}

export function saveEmployer(employer, token) {

    return function (dispatch) {

        dispatch({type: SAVE_EMPLOYER, loading: true})

        return fetch(ROOT_URL+'employer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'x-access-token': token
            },
            body: JSON.stringify({
                companyName: employer.companyName,
                domainUrl: employer.domainUrl,
                careersUrl: employer.careersUrl,
                boardToken: employer.boardToken,
                linkedInUrl: employer.linkedInUrl,
                productImage:employer.productImage,
                accountType: employer.accountType,
                atsType: employer.atsType

            })
        })
            .then((response) => response.json())
            .then((responseData) => {
	            if(responseData.error){
		            dispatch(saveEmployerFailure(responseData))

	            }else{
		            dispatch(saveEmployerSuccess(responseData))
	            }
            })
            .catch((error) => {
                dispatch(saveEmployerFailure(error))
            });
    }
}

export function saveEmployerSuccess(responseData) {

    return function (dispatch) {

	    dispatch({type: SAVE_EMPLOYER_SUCCESS, employer: responseData, loading: false})

    }
}

export function saveEmployerFailure(error) {
    return {
        type: SAVE_EMPLOYER_FAILURE, loading: false
    };
}


export function removeEmployer(id, token) {

    return function (dispatch) {

        dispatch({type: REMOVE_EMPLOYER, loading: true})

        return fetch(ROOT_URL+'employer/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token

            },
        })
            .then((response) => response.json())
            .then((responseData) => {
	            if(responseData.error){
		            dispatch(removeEmployerFailure(responseData))

	            }else{
		            dispatch(removeEmployerSuccess(responseData))
	            }
            })
            .catch((error) => {
                dispatch(removeEmployerFailure(error))
            });
    }
}

export function removeEmployerSuccess(responseData) {

    return function (dispatch) {

	    dispatch({type: REMOVE_EMPLOYER_SUCCESS, employer: responseData, loading: false})

    }
}

export function removeEmployerFailure(error) {
    return {
        type: REMOVE_EMPLOYER_FAILURE, loading: false
    };
}

export function updateEmployer(employer, token) {

    return function (dispatch) {

        dispatch({type: UPDATE_EMPLOYER, loading: true})

        return fetch(ROOT_URL+'employer/'+employer.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                companyName: employer.companyName,
                domainUrl: employer.domainUrl,
                careersUrl: employer.careersUrl,
                boardToken: employer.boardToken,
                linkedInUrl: employer.linkedInUrl,
                productImage: employer.productImage,
                accountType: employer.accountType,
                atsType: employer.atsType
            })
        })
            .then((response) => response.json())
            .then((responseData) => {

	            if(responseData.error){
		            dispatch(updateEmployerFailure(responseData))

	            }else{

		            dispatch(updateEmployerSuccess(responseData))
	            }
            })
            .catch((error) => {
                dispatch(updateEmployerFailure(error))
            });
    }
}

export function updateEmployerSuccess(responseData) {

    return function (dispatch) {

	    dispatch({type: UPDATE_EMPLOYER_SUCCESS, employer:responseData, loading: false})

    }
}

export function updateEmployerFailure(error) {
    return {
        type: UPDATE_EMPLOYER_FAILURE, loading: false
    };
}

export function refreshEmployer(id, token) {


    return function (dispatch) {


        dispatch({type: REFRESH_EMPLOYER, loading: true})


        return fetch(ROOT_URL+'employer/refresh/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token

            }
        })
            .then((response) => response.json())
            .then((responseData) => {
	            if(responseData.error){
		            dispatch(refreshEmployerFailure(responseData))

	            }else{
		            dispatch(refreshEmployerSuccess(responseData))
	            }
            })
            .catch((error) => {
                dispatch(refreshEmployerFailure(error))
            });
    }
}


export function refreshEmployerSuccess(responseData) {


    return function (dispatch) {

        dispatch({type: REFRESH_EMPLOYER_SUCCESS, employer: responseData, loading: false})
    }
}


export function refreshEmployerFailure(error) {


    return function (dispatch) {

        dispatch({type: REFRESH_EMPLOYER_FAILURE, loading: false})
    }
}

export function refreshAllEmployers(token){

    return function (dispatch) {


        dispatch({type: REFRESH_ALL_EMPLOYER, loading: true})


        return fetch(ROOT_URL+'employer/refresh/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token

            }
        })
            .then((response) => response.json())
            .then((responseData) => {

	            if(responseData.error){
		            dispatch(refreshAllEmployerFailure(responseData))

	            }else{
		            dispatch(refreshAllEmployerSuccess(responseData))
	            }
            })
            .catch((error) => {
                dispatch(refreshAllEmployerFailure(error))
            });
    }
}


export function refreshAllEmployerSuccess(responseData) {


    return function (dispatch) {

        dispatch({type: REFRESH_ALL_EMPLOYER_SUCCESS, data: responseData, loading: false})
    }
}


export function refreshAllEmployerFailure(error) {


    return function (dispatch) {

        dispatch({type: REFRESH_ALL_EMPLOYER_FAILURE, loading: false})
    }
}

export function resetEmployerData() {

  return function (dispatch) {

    dispatch({type: RESET_EMPLOYER_DATA})

  }
}
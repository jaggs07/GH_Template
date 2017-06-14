
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const USER_INFO = "USER_INFO"
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS"
export const USER_INFO_FAILURE = "USER_INFO_FAILURE"

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const RESET_USER = "RESET_USER";

export const RESET_USER_DATA = "RESET_USER_DATA";

const ROOT_URL = 'http://localhost:8090/api/';

export function register(firstName, lastName, email, password, accountType) {
    return function (dispatch) {
        dispatch({type: REGISTER, loading: true})

        return fetch(ROOT_URL+'user/signUp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                accountType: accountType
            })
        })
            .then((response) => response.json())
            .then((json) => {
                if(json.token){
                    dispatch(registerSuccess(json))

                }else if( json.error){
                    dispatch(registerFailure(json))
                }
            })
            .catch((error) => {
                dispatch(registerFailure(error))
            });
    }
}

export function registerSuccess(json) {
    return {
        type: REGISTER_SUCCESS, loading: false,
        data: json
    };
}

export function registerFailure(error) {
    return {
        type: REGISTER_FAILURE, loading: false,
        error: error
    };
}

export function login(email, password) {
    return function (dispatch) {
        dispatch({type: LOGIN, loading: true})

        return fetch(ROOT_URL+'user/SignIn', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((response) => response.json())
            .then((json) => {

                if(json.token){
                    dispatch(loginSuccess(json))

                }else if( json.error){
                    dispatch(loginFailure(json))
                }
            })
            .catch((error) => {
                dispatch(loginFailure(error))
            });
    }
}

export function loginSuccess(json) {
    return {
        type: LOGIN_SUCCESS, loading: false,
        data: json
    };
}

export function userInfo(token) {
    return function (dispatch) {
        dispatch({type: USER_INFO, loading: true})

        return fetch(ROOT_URL+'auth/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token

            },
        })
            .then((response) => response.json())
            .then((json) => {
                if(json){
                    dispatch(userInfoSuccess(json))

                }else if( json.error){
                    dispatch(userInfoFailure(json))
                }
            })
            .catch((error) => {
                dispatch(userInfoFailure(error))
            });
    }
}

export function userInfoSuccess(json) {

    return {
        type: USER_INFO_SUCCESS, loading: false,
        detail: json
    };
}

export function userInfoFailure(error) {
    return {
        type: USER_INFO_FAILURE, loading: false,
        error: error
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE, loading: false,
        error: error
    };
}

export function fetchUsers(token) {

    return function (dispatch) {

        dispatch({type: FETCH_USERS, loading: true})

        return fetch(ROOT_URL+'user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                dispatch(fetchUsersSuccess(responseData))
            })
            .catch((error) => {
                dispatch(fetchUsersFailure(error))
            });
    }
}

export function fetchUsersSuccess(users) {

    return function (dispatch) {

        if (users.length > 0) {

            dispatch({type: FETCH_USERS_SUCCESS, data: users, loading: false})
        } else {
            dispatch({type: FETCH_USERS_FAILURE, data: users, loading: false})
        }
    }
}

export function fetchUsersFailure(error) {
    return {
        type: FETCH_USERS_FAILURE, loading: false
    };
}

export function resetUser() {

  return function (dispatch) {

    dispatch({type: RESET_USER, loading: false, updateSuccess: false, passwordChangeSuccess: false, error: {}})

  }
}

export function resetUserData() {

  return function (dispatch) {

    dispatch({type: RESET_USER_DATA})

  }
}
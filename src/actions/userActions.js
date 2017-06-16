export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const USER_INFO = "USER_INFO"
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS"
export const USER_INFO_FAILURE = "USER_INFO_FAILURE"

export const CREATE_USER = "CREATE_USER"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE"

export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const REMOVE_USER = "REMOVE_USER"
export const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS"
export const REMOVE_USER_FAILURE = "REMOVE_USER_FAILURE"

export const UPDATE_USER_ACCOUNT = "UPDATE_USER_ACCOUNT"
export const UPDATE_USER_ACCOUNT_SUCCESS = "UPDATE_USER_ACCOUNT_SUCCESS"
export const UPDATE_USER_ACCOUNT_FAILURE = "UPDATE_USER_ACCOUNT_FAILURE"

export const CHANGE_PASSWORD = "CHANGE_PASSWORD"
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS"
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE"

export const RESET_USER_DATA = "RESET_USER_DATA";

export const RESET_USER = "RESET_USER";
export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";


const ROOT_URL = window.location.hostname === 'localhost' ? 'http://localhost:8090/api/' : 'http://54.234.23.64:8090/api/';

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

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE, loading: false,
        error: error
    };
}

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

export function createUser(user, token) {

  return function (dispatch) {

    dispatch({type: CREATE_USER, loading: true})

    return fetch(ROOT_URL+'user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token

      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        companyName: user.companyName
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.error){
          dispatch(createUserFailure(responseData))

        }else{
          dispatch(createUserSuccess(responseData))
        }
      })
      .catch((error) => {
        dispatch(createUserFailure(error))
      });
  }
}

export function createUserSuccess(responseData) {

  return function (dispatch) {

    dispatch({type: CREATE_USER_SUCCESS, user: responseData, loading: false})

  }
}


export function createUserFailure(error) {
    return {
        type: CREATE_USER_FAILURE, loading: false
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

export function updateUser(user, token) {

  return function (dispatch) {

    dispatch({type: UPDATE_USER, loading: true})

    return fetch(ROOT_URL+'user/'+user.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        companyName: user.companyName,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {

        if(responseData.error){
          dispatch(updateUserFailure(responseData))

        }else{

          dispatch(updateUserSuccess(responseData))
        }
      })
      .catch((error) => {
        dispatch(updateUserFailure(error))
      });
  }
}

export function updateUserSuccess(responseData) {

  return function (dispatch) {

    dispatch({type: UPDATE_USER_SUCCESS, user:responseData, loading: false})

  }
}

export function updateUserFailure(error) {
  return {
    type: UPDATE_USER_FAILURE, loading: false
  };
}


export function deleteUser(id, token) {

  return function (dispatch) {

    dispatch({type: REMOVE_USER, loading: true})

    return fetch(ROOT_URL+'user/' + id, {
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
          dispatch(deleteUserFailure(responseData))

        }else{
          dispatch(deleteUserSuccess(responseData))
        }
      })
      .catch((error) => {
        dispatch(deleteUserFailure(error))
      });
  }
}

export function deleteUserSuccess(responseData) {

  return function (dispatch) {

    dispatch({type: REMOVE_USER_SUCCESS, user: responseData, loading: false})

  }
}

export function deleteUserFailure(error) {
  return {
    type: REMOVE_USER_FAILURE, loading: false
  };
}

export function updateUserAccount(user, token) {

  return function (dispatch) {

    dispatch({type: UPDATE_USER_ACCOUNT, loading: true})

    return fetch(ROOT_URL+'user/updateUserInfo/'+user.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName
      })
    })
      .then((response) => response.json())
      .then((responseData) => {

        if(responseData.error){
          dispatch(updateUserAccountFailure(responseData))

        }else{

          dispatch(updateUserAccountSuccess(responseData))
        }
      })
      .catch((error) => {
        dispatch(updateUserAccountFailure(error))
      });
  }
}

export function updateUserAccountSuccess(responseData) {

  return function (dispatch) {

    dispatch({type: UPDATE_USER_ACCOUNT_SUCCESS, user:responseData, loading: false, updateSuccess: true})

  }
}

export function updateUserAccountFailure(error) {
  return {
    type: UPDATE_USER_ACCOUNT_FAILURE, loading: false
  };
}

export function changePassword(currentPassword, newPassword, confirmPassword, id, token) {

  return function (dispatch) {

    dispatch({type: CHANGE_PASSWORD, loading: true})

    return fetch(ROOT_URL+'user/changePassword/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        password: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      })
    })
      .then((response) => response.json())
      .then((responseData) => {

        if(responseData.error){
          dispatch(changePasswordFailure(responseData))

        }else{

          dispatch(changePasswordSuccess(responseData))
        }
      })
      .catch((error) => {
          dispatch(changePasswordFailure(error))
      });
  }
}

export function changePasswordSuccess(responseData) {

  return function (dispatch) {

    dispatch({type: CHANGE_PASSWORD_SUCCESS, user:responseData, loading: false, passwordChangeSuccess: true})

  }
}

export function changePasswordFailure(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE, loading: false, error: error, passwordChangeSuccess: false
  };
}

export function resetUserData() {

  return function (dispatch) {

    dispatch({type: RESET_USER_DATA})

  }
}

export function resetUser() {

  return function (dispatch) {

    dispatch({type: RESET_USER, loading: false, updateSuccess: false, password: false, error: {}})

  }
}

export function resetErrorMessage(){
    return function( dispatch ){
        dispatch({
            type: RESET_ERROR_MESSAGE, error: {}
        })
    }
}






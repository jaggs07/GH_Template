export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const ROOT_URL = 'http://localhost:8090/api/';

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
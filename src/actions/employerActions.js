export const RESET_EMPLOYER_DATA = "RESET_EMPLOYER_DATA";

const ROOT_URL = 'http://localhost:8090/api/';

export function resetEmployerData() {

  return function (dispatch) {

    dispatch({type: RESET_EMPLOYER_DATA})

  }
}
export const FETCH_JOBS = 'FETCH_JOBS';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';

export const RESET_JOBS_DATA = 'RESET_JOBS_DATA';

export const SET_BOARD_TOKEN = 'SET_BOARD_TOKEN';
export const SET_COMPANY_NAME = 'SET_COMPANY_NAME';

export function fetchJobs(boardToken) {

  return function (dispatch) {

    dispatch({type: FETCH_JOBS, loading: true})

    return fetch("https://api.greenhouse.io/v1/boards/" + boardToken + "/jobs", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(fetchJobsSuccess(responseData))
      })
      .catch((error) => {
        dispatch(fetchJobsFailure(error))
      });
  }
}

export function fetchJobsSuccess(jobs) {

  return function (dispatch) {
    if(jobs.status === 404){
      dispatch({type: FETCH_JOBS_FAILURE, loading: false})

    }else if (jobs.length > 0) {

      dispatch({type: FETCH_JOBS_SUCCESS, data: jobs, loading: false})
    } else {
      dispatch({type: FETCH_JOBS_SUCCESS, data: jobs, loading: false})
    }
  }
}

export function fetchJobsFailure(error) {
  return {
    type: FETCH_JOBS_FAILURE, loading: false
  };
}

export function resetJobsData() {

  return function (dispatch) {

    dispatch({type: RESET_JOBS_DATA})

  }
}

export function setBoardToken(boardToken) {
    return function (dispatch) {
        dispatch({type: SET_BOARD_TOKEN, boardToken: boardToken});    
    }
}

export function setCompanyName(companyName) {
    return function (dispatch) {
        dispatch({type: SET_COMPANY_NAME, companyName: companyName});    
    }
}
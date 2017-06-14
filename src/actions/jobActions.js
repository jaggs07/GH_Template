export const RESET_JOBS_DATA = 'RESET_JOBS_DATA';

export function resetJobsData() {

  return function (dispatch) {

    dispatch({type: RESET_JOBS_DATA})

  }
}
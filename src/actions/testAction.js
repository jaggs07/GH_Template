
export const TEST_FETCH = "TEST_FETCH"

export function test() {

    return function (dispatch) {

        dispatch({type: TEST_FETCH, loading: true})

        return "Hello, this is a test fetch"
    }
}
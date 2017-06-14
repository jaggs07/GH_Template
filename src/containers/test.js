import { connect } from 'react-redux';
import { test } from '../actions/testAction';

import Login from '../views/Login/';

const mapStateToProps = (state) => {
    return {
        user: state.testReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTest: () => {
            dispatch(test())
        }
    }
}

const TestContainer = connect(mapStateToProps, mapDispatchToProps, null)(Login)

export default TestContainer

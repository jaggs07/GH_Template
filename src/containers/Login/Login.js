import { connect } from 'react-redux';
import { login } from '../../actions/userActions';

import Login from '../../views/Login/';

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: (email, password) => {
            dispatch(login(email, password))
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps, null)(Login)

export default LoginContainer

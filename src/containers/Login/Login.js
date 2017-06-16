import { connect } from 'react-redux';
import { login, resetUser } from '../../actions/userActions';

import Login from '../../views/Login/';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        onLoginClick: (email, password) => {
            dispatch(login(email, password))
        },
        resetUserData: () => {
            dispatch(resetUser())
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps, null)(Login)

export default LoginContainer

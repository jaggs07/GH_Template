import { connect } from 'react-redux';
import { register, login } from '../../actions/userActions';

import Register from '../../views/Register/';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
      onRegisterClick: (firstName, lastName, email, password, accountType) => {
          dispatch(register(firstName, lastName, email, password, accountType))
        },

      loginUser: (email, password) => {
        dispatch(login(email, password))
    }
    }
}

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps, null)(Register)

export default RegisterContainer

import { connect } from 'react-redux';
import { resetUserData ,updateUserAccount, changePassword, resetUser, resetErrorMessage} from '../../actions/userActions';
import { resetJobsData } from '../../actions/jobActions';
import { resetEmployerData } from '../../actions/employerActions';

import Header from '../../components/Header/';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        resetUserData: () => {
            dispatch(resetUserData());
        },
        resetJobsData: () => {
            dispatch(resetJobsData());
        },
        resetEmployerData: () => {
            dispatch(resetEmployerData());
        },
        updateUserAccount: (user, token ) => {
            dispatch(updateUserAccount(user, token));
        },
        changePassword: (currentPassword, newPassowrd, confirmPassword, id, token) => {
            dispatch(changePassword(currentPassword, newPassowrd, confirmPassword, id, token));
        },
        resetErrorMessage: () => {
            dispatch(resetErrorMessage());
        },
        resetUser: () => {
            dispatch(resetUser());
        },
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps, null)(Header)

export default HeaderContainer

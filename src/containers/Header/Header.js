import { connect } from 'react-redux';
import { resetUserData } from '../../actions/userActions';
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
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps, null)(Header)

export default HeaderContainer

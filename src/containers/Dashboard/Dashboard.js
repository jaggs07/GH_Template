import { connect } from 'react-redux';
import { userInfo } from '../../actions/userActions';

import Dashboard from '../../views/Dashboard/';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        job: state.jobReducer.job
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        userDetail: (token) => {
            dispatch(userInfo(token))
        }
    }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps, null)(Dashboard)

export default DashboardContainer

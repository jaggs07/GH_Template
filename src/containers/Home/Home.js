import { connect } from 'react-redux';
import { userInfo } from '../../actions/userActions';

import Home from '../../views/Home/';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        userDetail: (token) => {
            dispatch(userInfo(token))
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps, null)(Home)

export default HomeContainer

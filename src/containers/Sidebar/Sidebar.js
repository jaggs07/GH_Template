import { connect } from 'react-redux';
import { userInfo } from '../../actions/userActions';

import Sidebar from '../../components/Sidebar/';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps, null)(Sidebar)

export default SidebarContainer

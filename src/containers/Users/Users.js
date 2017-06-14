import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/userActions';

import Users from '../../views/Users/';

const mapStateToProps = (state) => {
    return {
		data: state.userReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
      onFetchUsers: (token) => {
            dispatch(fetchUsers(token));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps, null)(Users)

export default UsersContainer

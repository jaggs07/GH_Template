import { connect } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../actions/userActions';

import Users from '../../views/Users/';

const mapStateToProps = (state) => {
    return {
		data: state.userReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        createUser: (user, token) => {
            dispatch(createUser(user, token));
        },
        fetchUsers: (token) => {
            dispatch(fetchUsers(token));
        },
        updateUser: (user, token) => {
          dispatch(updateUser(user,token));
        },
        deleteUser: (id, token) => {
          dispatch(deleteUser(id,token));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps, null)(Users)

export default UsersContainer

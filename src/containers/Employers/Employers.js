import { connect } from 'react-redux';
import { fetchEmployers, removeEmployer, saveEmployer,
        updateEmployer, refreshEmployer,
        refreshAllEmployers  } from '../../actions/employerActions';
import { resetJobsData , setBoardToken, setCompanyName } from '../../actions/jobActions';

import Employers from '../../views/Employers/';

const mapStateToProps = (state) => {
    return {
        data: state.employerReducer.employer,
		user: state.userReducer.user    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        fetchEmployers: (token) => {
			dispatch(fetchEmployers(token));
		},

        onRemoveEmployer: (id, token) => {
            dispatch(removeEmployer(id, token));
        },

        onSaveEmployer: (employer, token) => {
            dispatch(saveEmployer(employer, token));
        },

        onUpdateEmployer: (employer, token) => {
            dispatch(updateEmployer(employer, token));
        },

        onRefreshEmployer: (id, token) => {
            dispatch(refreshEmployer(id, token));
        },

        onRefreshAllEmployers: (token) => {
            dispatch(refreshAllEmployers(token));
        },
        resetJobsData: () => {
          dispatch(resetJobsData());
        },
        setBoardToken: (boardToken) => {
            dispatch(setBoardToken(boardToken));
        },
        setCompanyName: (companyName) => {
            dispatch(setCompanyName(companyName));
        }
    }
}

const EmployersContainer = connect(mapStateToProps, mapDispatchToProps, null)(Employers)

export default EmployersContainer

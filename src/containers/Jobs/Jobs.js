import { connect } from 'react-redux';
import { fetchJobs  } from '../../actions/jobActions';

import Jobs from '../../views/Jobs/';

const mapStateToProps = (state) => {
    return {
        job: state.jobReducer.job,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        fetchJobs: (boardToken) => {
            dispatch(fetchJobs(boardToken))
        }
    }
}

const JobsContainer = connect(mapStateToProps, mapDispatchToProps, null)(Jobs)

export default JobsContainer

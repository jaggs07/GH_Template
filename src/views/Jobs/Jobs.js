import React, { Component } from 'react';
import _ from "lodash";
import Cookie from 'universal-cookie';

const cookies = new Cookie();

const ROOT_URL ='http://localhost:8090/api/';

class Tables extends Component {

    constructor(props){
      super(props);

      this.state = {
          boardToken: this.props.job.boardToken,
          companyName: this.props.job.companyName
      }
  }

  componentWillMount(){

    if(this.state.boardToken !== ''){
      this.props.fetchJobs(this.state.boardToken);
    }

    var token = cookies.get('token');

    if(token.email !== 'rake@reignger.com' && ('id' in this.props.user.detail) ){

        let id = this.props.user.detail.id;

        fetch(ROOT_URL + 'user/' + id + '/employer', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token.token
          },
        })
        .then((response) => response.json())
        .then((responseData) => {

              if(responseData.error){
		               this.setState({
                        boardToken: ''
                  });
	            }else{
                  this.setState({
                        boardToken: responseData.boardToken,
                        companyName: responseData.companyName
                  }, function() {
                    this.props.fetchJobs(this.state.boardToken)
                  });
	            }
        })
        .catch((error) => {
            return {options : [{ value: 'Company fetch error...', label: 'Company fetch error...' }]}
        });
    }
  }

  render() {

    var jobList = this.props.job.data.jobs;
    var jobDetailList = [];

    var sortedJobList = _.sortBy(jobList, 'updated_at', function(n) {

      return Math.sin(n);
    }).reverse();

    if(typeof sortedJobList !== 'undefined' && sortedJobList.length >0){

      jobDetailList = sortedJobList.map( (job, i) => {

          var updatedDate = job.updated_at.split("T")[0];

          var jobObject = <tr key={i} className="header">
                            <td title={job.title}>{job.title.substring(0,30)}</td>
                            <td >{job.location.name}</td>
                            <td >{updatedDate}</td>
                          </tr>
          return jobObject;
      }, this);
    }

    var cardHeader = '';

    if(this.state.boardToken !== ''){
      cardHeader = <div className="card-header">
                    <i className="fa fa-align-justify"></i> <strong>{this.state.companyName}</strong> Job Lists
                  </div>
    }else{
      cardHeader = <div className="card-header">
                    <i className="fa fa-align-justify"></i> Jobs Table
                  </div>
    }

    var resultDisplay = null;
    
    if ( jobDetailList.length > 0) {

      resultDisplay = <table className="table">
                          <thead>
                              <tr>
                                <th >Title</th>
                                <th >Location </th>
                                <th >Updated Date </th>
                              </tr>
                          </thead>

                          <tbody>
                            {jobDetailList}
                          </tbody>
                      </table>                         
    }

  

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              
              {cardHeader}

              <div className="card-block">
                {resultDisplay}             
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Tables;
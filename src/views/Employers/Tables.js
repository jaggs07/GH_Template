import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import Dropdown from 'react-drop-down'
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import _ from 'lodash';
import Cookie from 'universal-cookie';

const cookies = new Cookie();

class Tables extends Component {

  constructor(props) {
        super(props);

        this.state = {
            showModal : false,
            showDeleteModal: false,
            employerId: '',
            formType: '',
            employer : {
                companyName: '',
                domainUrl: '',
                careersUrl: '',
                boardToken: '',
                linkedInUrl: '',
                product_image: '',
                accountType: 'client',
                atsType: 'greenhouse',
            }
        }
    }

     componentWillMount = () => {
      var token = cookies.get('token');
      this.props.fetchEmployers(token.token);
    }

    displayNotification(message, level = 'error') {
        this.refs.notificationSystem.addNotification({
        message: message,
        level: level,
        dismissible: false,
        autoDismiss: 3,
        position: 'tc'
        });
    }

    openFormModal = (e) => {
        if(e.target.value === "updateEmployer"){

            this.setState({
                showModal: true,
                formType: "Update Employer"
            });
        }else{
            this.setState({

                showModal: true,
                formType: "Create New Employer",
                employer : {
                    companyName: '',
                    domainUrl: '',
                    careersUrl: '',
                    boardToken: '',
                    linkedInUrl: '',
                    product_image: '',
                    accountType: '',
                    atsType: ''
                }
            });
        }
    }

    closeFormModal = () => {
        this.setState({
            showModal: false,
        });
    }

    handleSaveEmployer = () => {
        var token = cookies.get('token');
        var companyName = this.state.employer.companyName;

        if( companyName.length === 0 ) {
            this.displayNotification('Enter Company Name');
        }else{
            this.props.onSaveEmployer(this.state.employer, token.token);
            this.setState({ showModal: false});
        }
    }

    openDeleteModal = (e) => {
        this.setState({
            showDeleteModal: true,
            employerId: e.target.value
        });
    }

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
        });
    }

    handleDeleteConfirmClick = () => {
        var token = cookies.get('token');
        this.props.onRemoveEmployer(this.state.employerId, token.token);

        this.setState ({
            showDeleteModal: false
        })
    }

    handleChangeCompanyName = (e) => {
        var employer = this.state.employer;
        employer.companyName = e.target.value;

        this.setState({
            employer : employer
        });
    }

    handleChangeDomainUrl = (e) => {
        var employer = this.state.employer;
        employer.domainUrl = e.target.value;

        this.setState({
            employer : employer
        });
    }

    handleChangeCareersUrl = (e) => {
        var employer = this.state.employer;
        employer.careersUrl = e.target.value;

        this.setState({
            employer : employer

        });
    }

    handleChangeBoardToken = (e) => {
        var employer = this.state.employer;
        employer.boardToken = e.target.value;

        this.setState({
            employer : employer

        });
    }

    handleChangeLinkedInUrl = (e) => {
        var employer = this.state.employer;
        employer.linkedInUrl = e.target.value;

        this.setState({
            employer : employer

        });
    }

    handleChangeProductImage = (e) => {
        var employer = this.state.employer;
        employer.productImage = e.target.value;

        this.setState({
            employer : employer
        });
    }


    handleAccountTypeChange = (e) => {
        var employer = this.state.employer;
        employer.accountType = e;

        this.setState({
            employer : employer
        });
    }

    handleATSTypeChange = (e) => {
        var employer = this.state.employer;
        employer.atsType = e;
        
        this.setState({
            employer : employer
        });
    }

    openUpdateEmployerModal = (employer, e) => {
        var tmpEmployer = this.state.employer;

        tmpEmployer.companyName = employer.companyName;
        tmpEmployer.domainUrl = employer.domainUrl;
        tmpEmployer.careersUrl = employer.careersUrl;
        tmpEmployer.boardToken = employer.boardToken;
        tmpEmployer.linkedInUrl = employer.linkedInUrl;
        tmpEmployer.productImage = employer.productImage;
        tmpEmployer.accountType = employer.accountType;
        tmpEmployer.atsType = employer.atsType;

        this.setState({
            employer : tmpEmployer,
            employerId: employer.id
        });
        this.openFormModal(e);
    }

    handleUpdateEmployer = () => {
        var token = cookies.get('token');
        var updatedEmployer = {};

        updatedEmployer.id = this.state.employerId;
        _.merge(updatedEmployer, this.state.employer);

        this.props.onUpdateEmployer(updatedEmployer, token.token);
        this.setState({ showModal: false});

    }

    handleRefresh = (id) => {
        var token = cookies.get('token');
        this.props.onRefreshEmployer(id, token.token);
    }

    handleRefreshAllClick = () => {
        var token = cookies.get('token');
        this.props.onRefreshAllEmployers(token.token);
    }

    handleBoardTokenClick = (boardToken) => {
      var boardTokenUrl = "https://api.greenhouse.io/v1/boards/" + boardToken + "/jobs";
      window.open(boardTokenUrl);
    }

    handleCompanyNameClick = (boardToken,companyName) =>{
        this.props.onStateChange(companyName,boardToken);
        this.props.selectDashboardTab();
        this.props.router.push('/dashboard')
    }
    
    handleTotalJobsClick = (boardToken,companyName) => {
        this.props.resetJobsData();
        this.props.onStateChange(companyName,boardToken);
        this.props.selectJobTab();
        this.props.router.push('/jobs')
    }

  render() {

     var notificationStyle = {

            NotificationItem: {

                DefaultStyle: {
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                    borderRadius: '3px',
                },
                error: {
                    border: 'none',
                    backgroundColor: '#d73b41',
                    color: '#fff'
                },
            }
        }

        var addEmployerButton = null;

        if(this.props.user.detail.superUser === 1){

            addEmployerButton = <span className="add-employer-employer"><button value="addEmployer" type="button" onClick={ this.openFormModal } className="btn btn-primary add-employer"><i className="glyphicon glyphicon-plus" /> Add Employer</button></span>
        }

        var  button = null;

        if(this.state.formType === "Create New Employer"){
            button = <Button onClick={this.handleSaveEmployer} bsStyle="primary">Save</Button>
        }else{
            button = <Button onClick={this.handleUpdateEmployer}  bsStyle="primary">Update</Button>
        }

        var employerList = this.props.data.data;

        var employerDetailList = [];

        if(typeof employerList !== 'undefined' && employerList.length >0){

                    employerDetailList = employerList.map( (employer, i) => {

                            var employerObject =  <tr key={i} className="header">

                                                        <td ><div onClick={this.handleCompanyNameClick.bind(this,employer.boardToken,employer.companyName)}>{ employer.companyName }</div></td>
                                                        <td > <a href={employer.careersUrl} target="_blank" > { employer.careersUrl.substring(0,35) } </a></td>
                                                        <td > <a href={ employer.linkedInUrl } target="_blank" > { employer.linkedInUrl.substring(0,35) } </a></td>
                                                        <td > <a href="" onClick={this.handleBoardTokenClick.bind(this,employer.boardToken)} target="_blank" > { employer.boardToken } </a></td>
                                                        <td >  { employer.accountType } </td>
                                                        <td > <div onClick={this.handleTotalJobsClick.bind(this,employer.boardToken, employer.companyName)} > { employer.totalJobs } </div></td>
                                                        <td>
                                                          <span title="Edit" value="updateEmployer" className="fa fa-pencil-square fa-lg mt-4" onClick={this.openUpdateEmployerModal.bind(this, employer)}></span>&nbsp;
                                                          <span title="Refresh" className="fa fa-refresh fa-lg mt-4" onClick={this.handleRefresh.bind(this, employer.id)}></span>&nbsp;
                                                          <span title="Delete" className="fa fa-trash-o fa-lg mt-4" value={employer.id} onClick={this.openDeleteModal}></span>
                                                        </td>
                                                 </tr>
                            return employerObject;

                   }, this);
        }

        var resultDisplay = null;

        if ( employerDetailList.length > 0) {

            resultDisplay = 
                        <table className="table">
                            <thead>
                            <tr >
                                <th >Company </th>
                                <th >Careers Url </th>
                                <th >LinkedIn Url </th>
                                <th >Token </th>
                                <th >Account Type </th>
                                <th >Total Jobs </th>
                                <th ></th>
                            </tr>
                            </thead>
                            <tbody>
                            {employerDetailList}
                            </tbody>
                        </table>
        }else{

            resultDisplay = <div className="employer-container">
                                <div className="add-employer-button">
                                    <button value="addEmployer" type="button" onClick={ this.openFormModal } className="btn btn-primary add-employer">Add Employer</button>
                                </div>
                            </div>
        }
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Employers Table
              </div>

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

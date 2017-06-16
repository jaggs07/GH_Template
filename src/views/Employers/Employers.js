import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import _ from 'lodash';
import Cookie from 'universal-cookie';
import { hashHistory } from 'react-router'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';

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
            },
            accountTypeOptions: [
                 { value: 'client', label: 'client' },
                 { value: 'prospect', label: 'prospect' }
            ],
            atsOptions: [
                 { value: 'greenhouse', label: 'greenhouse' },
                 { value: 'other', label: 'other' }
            ]
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

    openFormModal = (formType) => {
        if(formType === "updateEmployer"){

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

    openDeleteModal = (employerId) => {
        this.setState({
            showDeleteModal: true,
            employerId: employerId
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
        employer.accountType = e.value;

        this.setState({
            employer : employer
        });
    }

    handleATSTypeChange = (e) => {
        var employer = this.state.employer;
        employer.atsType = e.value;
        
        this.setState({
            employer : employer
        });
    }

    openUpdateEmployerModal = (employer, formType) => {
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
        this.openFormModal(formType);
    }

    handleUpdateEmployer = () => {
        var token = cookies.get('token');
        var updatedEmployer = {};

        updatedEmployer.id = this.state.employerId;
        _.merge(updatedEmployer, this.state.employer);

        this.props.onUpdateEmployer(updatedEmployer, token.token);
        this.setState({ showModal: false});
    }

    handleRefresh = (employerId) => {
        var token = cookies.get('token');
        this.props.onRefreshEmployer(employerId, token.token);
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
        this.props.setBoardToken(boardToken)
        this.props.setCompanyName(companyName)
        hashHistory.push('/dashboard');
    }
    
    handleTotalJobsClick = (boardToken,companyName) => {
        this.props.resetJobsData();
        this.props.setBoardToken(boardToken);
        this.props.setCompanyName(companyName);
        hashHistory.push('/jobs')
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

        var  button = null;

        if(this.state.formType === "Create New Employer"){
            button = <Button onClick={this.handleSaveEmployer} color="primary">Save</Button>
        }else{
            button = <Button onClick={this.handleUpdateEmployer}  color="primary">Update</Button>
        }

        var employerList = this.props.data.data;

        var employerDetailList = [];

        if(typeof employerList !== 'undefined' && employerList.length >0){

            employerDetailList = employerList.map( (employer, i) => {

                var employerObject = 
                    <tr key={i}>

                        <td >
                            <div 
                                onClick={this.handleCompanyNameClick.bind(this,employer.boardToken,employer.companyName)}>
                                { employer.companyName }
                            </div>
                        </td>
                        <td > 
                            <a href={employer.careersUrl} target="_blank" > 
                                { employer.careersUrl.substring(0,35) } 
                            </a>
                        </td>
                        <td > 
                            <a href={ employer.linkedInUrl } target="_blank" >
                                { employer.linkedInUrl.substring(0,35) } 
                            </a>
                        </td>
                        <td > 
                            <a href="" onClick={this.handleBoardTokenClick.bind(this,employer.boardToken)} target="_blank" > 
                                { employer.boardToken } 
                            </a>
                        </td>
                        <td >  { employer.accountType } </td>
                        <td > 
                            <div onClick={this.handleTotalJobsClick.bind(this,employer.boardToken, employer.companyName)} > 
                                { employer.totalJobs } 
                            </div>
                        </td>
                        <td>
                             <button 
                                title="Delete" 
                                type="button" 
                                className="btn btn-danger btn-sm"
                                onClick={ this.openDeleteModal.bind(this, employer.id) }>
                                <i className="fa fa-trash-o fa-sm" />
                            </button>

                            <button 
                                title="Refresh" 
                                type="button" 
                                className="btn btn-primary btn-sm"
                                onClick={ this.handleRefresh.bind(this, employer.id) } >
                                <i className="fa fa-refresh fa-sm" />
                            </button>
                           
                            <button 
                                title="Update" 
                                type="button" 
                                className="btn btn-primary btn-sm"
                                onClick={ this.openUpdateEmployerModal.bind(this, employer, "updateEmployer") }>
                                <i className="fa fa-pencil fa-sm" />
                            </button>  

                        </td>
                    </tr>

                return employerObject;
            }, this);
        }

        var addRefreshButton = null;

        if(employerDetailList.length > 0){

            addRefreshButton = <button type="button" className="btn btn-primary table-refresh-button"
                                        onClick={ this.handleRefreshAllClick } >
                                    <i className="fa fa-refresh fa-lg" />&nbsp; Refresh All
                                </button>
        } 

        var resultDisplay = null;

        if ( employerDetailList.length > 0) {

            resultDisplay = 
                        <table className="table table-striped">
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
        }
        
    return (
        <div className="animated fadeIn">

            <NotificationSystem ref="notificationSystem" style={notificationStyle}/>

            <Modal isOpen={this.state.showModal} onHide={this.closeFormModal} toggle={this.closeFormModal} className="modal-lg modal-info modal-employer">
                <ModalHeader toggle={this.closeFormModal}>{this.state.formType}</ModalHeader>
                <ModalBody>

                    <NotificationSystem ref="notificationSystem" style={notificationStyle}/>

                    <div className="form-wrapper">

                        <div className="form-group row">
                            <label htmlFor="company-name-" className="col-sm-3 col-form-label">Company
                                Name</label>
                            <div className="col-sm-9 company-name-field">
                                <input className="form-control" required="required"
                                        onChange={ this.handleChangeCompanyName }
                                        value={this.state.employer.companyName} type="text" id="companyName"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="domain-name" className="col-sm-3 col-form-label">Domain Url</label>
                            <div className="col-sm-9 domain-name-field">
                                <input className="form-control" onChange={ this.handleChangeDomainUrl }
                                        value={this.state.employer.domainUrl} type="text" id="domain"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="careers-page" className="col-sm-3 col-form-label">Careers
                                Page</label>
                            <div className="col-sm-9 careers-page-field">
                                <input className="form-control" onChange={ this.handleChangeCareersUrl }
                                        value={this.state.employer.careersUrl} type="text" id="careersPage"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="linkedin-page" className="col-sm-3 col-form-label">Linkedin
                                Page</label>
                            <div className="col-sm-9 linkedin-page-name-field">
                                <input className="form-control" onChange={ this.handleChangeLinkedInUrl }
                                        value={this.state.employer.linkedInUrl} type="text" id="linkedInPage"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="gh-board-token" className="col-sm-3 col-form-label">GH Board
                                Token</label>
                            <div className="col-sm-9 gh-board-token-field">
                                <input className="form-control" onChange={ this.handleChangeBoardToken }
                                        value={this.state.employer.boardToken} type="text" id="ghBoardToken"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="product-image" className="col-sm-3 col-form-label">Product Image</label>
                            <div className="col-sm-9 gh-product-image-field">
                                <input className="form-control" onChange={ this.handleChangeProductImage }
                                        value={this.state.employer.productImage} type="text" id="productImage"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="account-type" className="col-sm-3 col-form-label">Account Type</label>
                            <div className="col-sm-9 account-type">
                                <Select
                                    name="form-field-name"
                                    value={this.state.employer.accountType}
                                    options={this.state.accountTypeOptions}
                                    onChange={this.handleAccountTypeChange}
                                    searchable={false}
                                    />  
                            </div>

                        </div>

                        <div className="form-group row">
                            <label htmlFor="account-type" className="col-sm-3 col-form-label">ATS</label>
                            <div className="col-sm-9 ats-type">
                                <Select
                                    name="form-field-name"
                                    value={this.state.employer.atsType}
                                    options={this.state.atsOptions}
                                    onChange={this.handleATSTypeChange}
                                    searchable={false}

                                    />           
                            </div>

                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    {button}
                    <Button color="secondary" onClick={this.closeFormModal}>Cancel</Button>
                </ModalFooter>
            </Modal>    

            <Modal isOpen={this.state.showDeleteModal} toggle={this.closeDeleteModal} className="modal-sm">
                <ModalBody>
                    Are you sure you want to delete?<br/>
                    This can not be undone.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleDeleteConfirmClick}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.closeDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal> 

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                
                        <div className="card-header">
                            <i className="fa fa-align-justify"></i> Employers Table
                                {addRefreshButton}
                                
                                <button type="button" className="btn btn-primary table-add-button"
                                        onClick={ this.openFormModal.bind(this, "addEmployer") } >
                                    <i className="fa fa-plus fa-lg" />&nbsp; Add Employer
                                </button>

                            
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

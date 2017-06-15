import React, { Component } from 'react';
import Cookie from 'universal-cookie';
import _ from 'lodash';
import NotificationSystem from 'react-notification-system';
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const cookies = new Cookie();

const ROOT_URL = window.location.hostname === 'localhost' ? 'http://localhost:8090/api/' : 'http://54.234.23.64:8090/api/';

class Tables extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal : false,
            showDeleteModal: false,
            userId: '',
            formType: '',
            user : {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                companyName: ''
            }
        }
    }

    componentWillMount = () => {

        var token = cookies.get('token');
        this.props.fetchUsers(token.token);
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
        if(formType === "updateUser"){

            this.setState({
                showModal: true,
                formType: "Update User"
            });
        }else{

            this.setState({
                showModal: true,
                formType: "Create New User",
                user : {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    companyName: ''
                }
            });
        }
    }

    closeFormModal = () => {
        this.setState({
            showModal: false,

        });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    handleSaveUser = () => {

        var token = cookies.get('token');

        var firstName = this.state.user.firstName;
        var lastName = this.state.user.lastName;
        var email = this.state.user.email;
        var password = this.state.user.password;
        var companyName = this.state.user.companyName;

        if(firstName === ''){
            this.displayNotification("Enter First Name");
        }else if(lastName.length === 0){
            this.displayNotification("Enter Last Name");
        }else if(email.length === 0){
            this.displayNotification("Enter Email");
        }else if (!this.validateEmail(email)) {
            this.displayNotification("Enter valid Email");
        } else if(password.length === 0){
            this.displayNotification("Enter Password");
        }else if(password.length < 6){
            this.displayNotification("Password must contain minimum 6 characters");
        }else if (password.search(/[0-9]/) < 0) {
            this.displayNotification("Password must contain minimum single digit characters");
        }else if(companyName.length === 0){
            this.displayNotification("Select Company");
        }else{
            this.props.createUser(this.state.user,token.token);
            this.setState({ showModal: false});
        }
    }

    openDeleteModal = (userId) => {
        this.setState({
            showDeleteModal: true,
            userId: userId
        });
    }

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
        });
    }

    handleDeleteConfirmClick = () => {
        var token = cookies.get('token');
        this.props.deleteUser(this.state.userId, token.token);
        this.setState ({
            showDeleteModal: false
        })
    }

    handleChangeFirstName = (e) => {

        var user = this.state.user;

        user.firstName = e.target.value;
        this.setState({
            user : user
        });
    }

    handleChangeLastName = (e) => {

        var user = this.state.user;

        user.lastName = e.target.value;
        this.setState({
            user : user
        });
    }

    handleChangeEmail = (e) => {

        var user = this.state.user;

        user.email = e.target.value;
        this.setState({
            user : user

        });
    }

    handleChangePassword = (e) => {
        var user = this.state.user;

        user.password = e.target.value;
        this.setState({
            user : user

        });
    }

    handleChangeCompanyName = (e) => {

        var user = this.state.user;
        user.companyName = e.value;

        this.setState({
            user : user
        });
    }

    openUpdateUserModal = (user, formType) => {

        var tmpUser = this.state.user;

        tmpUser.firstName = user.firstName;
        tmpUser.lastName = user.lastName;
        tmpUser.email = user.email;
        tmpUser.password = user.password;
        tmpUser.companyName = user.companyName;

        this.setState({
            user : tmpUser,
            userId: user.id
        });

        this.openFormModal(formType);
    }

    handleUpdateUser = () => {

        var token = cookies.get('token');

        var updatedUser = {};

        updatedUser.id = this.state.userId;
        _.merge(updatedUser, this.state.user);
        this.props.updateUser(updatedUser, token.token);
        this.setState({ showModal: false});
    }

	getOptions = () => {
        var token = cookies.get('token');

		return fetch(ROOT_URL+'employer', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': token.token
			},
        })
        .then((response) => response.json())
        .then((responseData) => {

            var sortedCompany = _.sortBy(responseData, [employer => employer.companyName.toLowerCase()], ['asc']);

            var company = sortedCompany.map( (item) => ({ value: item.companyName, label: item.companyName }));

            return { options: company };
        })
        .catch((error) => {
            return {options : [{ value: 'Company fetch error...', label: 'Company fetch error...' }]}
        });
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
                }
            }
        }

        var  button = null;

        if(this.state.formType === "Create New User"){
            button = <Button color="primary" onClick={this.handleSaveUser} >Save</Button>
        }else{
            button = <Button color="primary" onClick={this.handleUpdateUser} >Update</Button>
        }

        var userList = this.props.data.data;
        var userDetailList = [];

        if(typeof userList !== 'undefined' && userList.length >0){

            userDetailList = userList.map( (user, i) => {

                var userObject = 
                    
                    <tr key={i}>
                        <td >{ user.firstName }</td>
                        <td >{ user.lastName }</td>
                        <td >{ user.email }</td>
                        <td >{ user.companyName }</td>

                        <td>
                            <button type="button" className="btn btn-danger btn-sm"
                                onClick={ this.openDeleteModal.bind(this, user.id) } >
                                <i className="fa fa-trash-o fa-sm" />
                            </button>

                            <button type="button" className="btn btn-primary btn-sm"
                                onClick={ this.openUpdateUserModal.bind(this, user, "updateUser") } >
                                <i className="fa fa-pencil fa-sm" />
                            </button>   
                        </td>
                    </tr>

                return userObject;

            }, this);
        }

        var resultDisplay = null;

        if ( userDetailList.length > 0) {

            resultDisplay =

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th >First Name</th>
                        <th >Last Name </th>
                        <th >Email </th>
                        <th >Company Name </th>
                        <th ></th>
                    </tr>
                    </thead>
                    <tbody>
                        {userDetailList}
                    </tbody>

                </table>
        }

  
    return (

        <div className="animated fadeIn">

            <NotificationSystem ref="notificationSystem" style={notificationStyle}/>

            <Modal isOpen={this.state.showModal} onHide={this.closeFormModal} toggle={this.closeFormModal} className="modal-info">
                <ModalHeader toggle={this.closeFormModal}>{this.state.formType}</ModalHeader>
                <ModalBody>
                <div className="form-wrapper">

                        <div className="form-group row">
                            <label htmlFor="first-name-" className="col-sm-3 col-form-label">First
                                Name</label>
                            <div className="col-sm-9 first-name-field">
                                <input className="form-control" required="required"
                                       onChange={ this.handleChangeFirstName }
                                       value={this.state.user.firstName} type="text" id="firstName"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="last-name" className="col-sm-3 col-form-label">Last Name</label>
                            <div className="col-sm-9 last-name-field">
                                <input className="form-control" onChange={ this.handleChangeLastName }
                                       value={this.state.user.lastName} type="text" id="lastName"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email
                                </label>
                            <div className="col-sm-9 email-field">
                                <input className="form-control" onChange={ this.handleChangeEmail }
                                       value={this.state.user.email} type="text" id="email"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="linkedin-page" className="col-sm-3 col-form-label">Password
                                </label>
                            <div className="col-sm-9 password-field">
                                <input className="form-control" onChange={ this.handleChangePassword }
                                       value={this.state.user.password} type="text" id="password"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="user-type" className="col-sm-3 col-form-label">Employer</label>
                            <div className="col-sm-9 account-type">

                                <Select.Async
                                    name="form-field-name"
                                    value={this.state.user.companyName}
                                    loadOptions={this.getOptions}
                                    onChange={this.handleChangeCompanyName}
                                    noResultsText="No matching company..."
                                    clearable={true}
                                    resetValue={true}
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
                    Are you sure you want to delete this user?<br/>
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
                            <i className="fa fa-align-justify"></i> Users Table
                            <button type="button" className="btn btn-primary table-add-button"
                                onClick={ this.openFormModal.bind(this, "addUser") } >
                                <i className="fa fa-plus fa-lg" />&nbsp; Add User
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

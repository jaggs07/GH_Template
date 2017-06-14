import React, { Component } from 'react';
import Cookie from 'universal-cookie';
import Button from 'react-bootstrap/lib/Button';
import _ from 'lodash';
import Modal from 'react-bootstrap/lib/Modal';
import NotificationSystem from 'react-notification-system';
import Select from 'react-select';

const cookies = new Cookie();

const ROOT_URL ='http://localhost:8090/api/';

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
        this.props.onFetchUsers(token.token);
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
        if(e.target.value === "updateUser"){

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
            this.props.onCreateUser(this.state.user,token.token);
            this.setState({ showModal: false});
        }
    }

    openDeleteModal = (e) => {
        console.log("pressed delete")
        this.setState({
            showDeleteModal: true,
            userId: e.target.value
        });
        console.log(this.state.userId,"user id")
    }

    closeDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
        });
    }

    handleDeleteConfirmClick = () => {
        var token = cookies.get('token');
        this.props.onRemoveUser(this.state.userId, token.token);
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

    openUpdateUserModal = (user, e) => {

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
                console.log(this.state.userId,"user id")

        this.openFormModal(e);
    }

    handleUpdateUser = () => {

        var token = cookies.get('token');

        var updatedUser = {};

        updatedUser.id = this.state.userId;
        _.merge(updatedUser, this.state.user);
        this.props.onUpdateUser(updatedUser, token.token);
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
            button = <Button onClick={this.handleSaveUser} bsStyle="primary">Save</Button>
        }else{
            button = <Button onClick={this.handleUpdateUser}  bsStyle="primary">Update</Button>
        }

        var userList = this.props.data.data;
        var userDetailList = [];

        if(typeof userList !== 'undefined' && userList.length >0){

                    userDetailList = userList.map( (user, i) => {

                            var userObject = <tr key={i}>
                                                <td >{ user.firstName }</td>
                                                <td >{ user.lastName }</td>
                                                <td >{ user.email }</td>
                                                <td >{ user.companyName }</td>

                                                <td>
                                                  <span title="Edit" value="updateUser" className="fa fa-pencil-square fa-lg mt-4" onClick={this.openUpdateUserModal.bind(this, user)}></span>&nbsp;
                                                  <span title="Delete" className="fa fa-trash-o fa-lg mt-4" value={user.id} onClick={this.openDeleteModal}></span>

                                                </td>
                                            </tr>
                            return userObject;
                   }, this);
        }

        var resultDisplay = null;

        if ( userDetailList.length > 0) {

            resultDisplay =

                    <table className="table">
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
        }else{

            resultDisplay =

                <div className="user-container">
                    <div className="add-user-button">
                        <button value="addUser" type="button" onClick={ this.openFormModal } className="btn btn-primary add-user"><i className="glyphicon glyphicon-plus" />Add User</button>
                    </div>
                </div>
        }

  
    return (
      <div className="animated fadeIn">
          <NotificationSystem ref="notificationSystem" style={notificationStyle}/>
            <Modal show={this.state.showModal} onHide={this.closeFormModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.formType}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.closeFormModal} bsStyle="primary">Cancel</Button>

                    {button}

                </Modal.Footer>

            </Modal>

            <Modal bsSize="small" show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>
                <Modal.Header closeButton>
                    <div className="Delete-popup-container">

                        <div className="Delete-popup-content">
                            <strong>Are you sure you want to delete this item?</strong>
                            This can not be undone.
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={this.handleDeleteConfirmClick} bsStyle="primary">Delete Item</Button>
                </Modal.Footer>
            </Modal>
        <div className="row">

          <div className="col-lg-12">
            <div className="card">
              
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Users Table
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

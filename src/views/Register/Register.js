import React, { Component } from 'react';
import Dropdown from 'react-drop-down';
import Cookie from 'universal-cookie';
import NotificationSystem from 'react-notification-system';
import { hashHistory } from 'react-router'

const cookies = new Cookie();

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            accountType: '',
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.user.data.token) {
            cookies.set('token', { 'email': this.state.email, 'token': nextProps.user.data.token });
            hashHistory.push('/');

        }else if (nextProps.user.error.error){

            this.displayNotification(nextProps.user.error.error);
        }
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
    getValidationState() {
        if (this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.email.length > 0 && this.state.password.length > 0) {
            return 'success';
        }

        return 'error';
    }

    handleFirstNameChange = (e) => {
        console.log(e.target.value,"first name")
        this.setState({ firstName: e.target.value });
    }

    handleLastNameChange = (e) => {
        console.log(e.target.value,"last name")
        this.setState({ lastName: e.target.value });
    }

    handleEmailChange = (e) => {
        console.log(e.target.value,"email")
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        console.log(e.target.value,"password")        
        this.setState({ password: e.target.value });
    }

    handleAccountTypeChange = (e) => {
        console.log(e,"account type")
        this.setState({accountType: e})
    }


    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.firstName.trim().length === 0) {
            this.displayNotification('Enter first name');
        }else if (this.state.lastName.trim().length === 0) {
            this.displayNotification('Enter last name');
        }else if (this.state.email.trim().length === 0) {
            this.displayNotification('Enter email');
        } else if (!this.validateEmail(this.state.email)) {
            this.displayNotification('Enter valid email');
        } else if (this.state.password.trim().length === 0) {
            this.displayNotification('Enter password');
        } else if (this.state.password.trim().length < 6) {
            this.displayNotification('Password must be at least 6 characters');
        }else if (this.state.password.trim().search(/[0-9]/) < 0) {
            this.displayNotification('Password must contain at least single digit character');
        }
        else if (this.state.accountType.length === 0) {
            this.displayNotification('Select account type for the client');
        }
        else {
            this.props.onRegisterClick(this.state.firstName,this.state.lastName, this.state.email, this.state.password, this.state.accountType)
        }
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

    return (
      <div className="app flex-row align-items-center">
          <NotificationSystem ref="notificationSystem" style={notificationStyle}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFirstNameChange} placeholder="First Name"/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLastNameChange} placeholder="Last Name"/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-addon">@</span>
                    <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                  </div>

                 <Dropdown
                    className="input-group mb-3"
                    options={["Select Client Type","client","prospect"]}
                    onChange={this.handleAccountTypeChange}
                    placeholder="Select Account Type"
                    value={this.state.accountType}
                />

                  <button type="button" className="btn btn-block btn-success" onClick={this.handleSubmit}>Create Account</button>
                </div>
                <div className="card-footer p-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

import React, { Component } from 'react';
import Cookie from 'universal-cookie';
import NotificationSystem from 'react-notification-system';
import { hashHistory } from 'react-router'
import LaddaButton, { ZOOM_IN } from 'react-ladda';

const cookies = new Cookie();

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            btnLoading: false
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.user.data.token) {

            cookies.set('token', { 'email': this.state.email, 'token': nextProps.user.data.token });
            hashHistory.push('/')
        } else if (nextProps.user.error.error) {

            this.displayNotification(nextProps.user.error.error);
            this.props.resetUserData();
        }
    }

    getValidationState() {
        if (this.state.email.length > 0 && this.state.password.length > 0) {
            return 'success';
        }
        return 'error';
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    displayNotification(message, level = 'error') {

        this.setState({
            btnLoading: !this.state.btnLoading
        }, () => {
            this.refs.notificationSystem.addNotification({
                message: message,
                level: level,
                dismissible: false,
                autoDismiss: 3,
                position: 'tc'
            });
        });
    }
    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            btnLoading: !this.state.btnLoading
        }, () => {

            if (this.state.email.trim().length === 0) {
                this.displayNotification('Enter email');
            } else if (!this.validateEmail(this.state.email)) {
                this.displayNotification('Enter valid email');
            } else if (this.state.password.trim().length === 0) {
                this.displayNotification('Enter password');
            } else if (this.state.password.trim().length < 6) {
                this.displayNotification('Password must be at least 6 characters');
            } else if (this.state.password.trim().search(/[0-9]/) < 0) {
                this.displayNotification('Password must contain one numeric characters');
            } else {
                this.props.onLoginClick(this.state.email, this.state.password)
            }
        });

    }

    handleRegisterClick = () => {
        hashHistory.push('/register');
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
                <NotificationSystem ref="notificationSystem" style={notificationStyle} />

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">

                            <div className="card-group mb-0">

                                <div className="card p-4">

                                    <div className="card-block">
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>

                                        <div className="input-group mb-3">
                                            <span className="input-group-addon"><i className="icon-user"></i></span>
                                            <input type="email" className="form-control" onChange={this.handleEmailChange} placeholder="Username" />
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <LaddaButton
                                                    className="btn btn-block btn-primary btn-ladda"
                                                    loading={this.state.btnLoading}
                                                    value='expZoomIn'
                                                    onClick={this.handleSubmit}
                                                    data-color="blue"
                                                    data-style={ZOOM_IN}
                                                >
                                                    Login
                                                </LaddaButton>
                                            </div>


                                            <div className="row">
                                                <div className="col-6">
                                                    <button type="button" onClick={this.handleSubmit} className="btn btn-primary px-4">Login</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                        <div className="card-block text-center">
                                            <div>
                                                <h2>Sign up</h2>
                                                <p>Don't have an account? You can create one by registering. </p>
                                                <button type="button" onClick={this.handleRegisterClick} className="btn btn-primary active mt-3">Register Now!</button>
                                            </div>
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

export default Login;

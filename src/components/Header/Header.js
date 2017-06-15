import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { hashHistory } from 'react-router'
import Cookie from 'universal-cookie';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const cookies = new Cookie();

class Header extends Component {

    constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
            activeTab: '1',
			dropdownOpen: false, 
            showModal: false,
            userId: '',
            user: {
              firstName: "",
              lastName: "",
            },
		};
	}

	handleLogoutClick = (e) => {
		console.log("logout")
		e.preventDefault();

		this.props.resetUserData();
		this.props.resetJobsData();
		this.props.resetEmployerData();

		var token = cookies.get('token');

		if (token) {
			cookies.remove('token')
		}
		hashHistory.push('/login')
	}

    toggleModal = () => {

        this.setState({
            showModal: !this.state.showModal
        });
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
        }
    }

	toggle =() => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	sidebarToggle(e) {
		e.preventDefault();
		document.body.classList.toggle('sidebar-hidden');
	}

	mobileSidebarToggle(e) {
		e.preventDefault();
		document.body.classList.toggle('sidebar-mobile-show');
	}

	asideToggle(e) {
		e.preventDefault();
		document.body.classList.toggle('aside-menu-hidden');
	}

	render() {


        var editAccountForm = 
        
            <div className="settings-content-container-inner">
                <div className="settings-label hidden"></div>
                <FormGroup>
                <label htmlFor="first-name" className="form-label">First Name</label>

                <FormControl
                    className="settings-textfield"
                    type="text"
                    value={this.state.user.firstName}
                    onChange={this.handleFirstNameChange}
                    placeholder="First Name"
                    />

                <label htmlFor="last-name" className="form-label">Last Name</label>
                <FormControl
                    className="settings-textfield"
                    type="text"
                    value={this.state.user.lastName}
                    onChange={this.handleLastNameChange}
                    placeholder="Last Name"
                    />

                </FormGroup>  
            </div>

        var changePasswordForm =
            <div className="settings-content-container-inner">
                <FormGroup>

                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <FormControl
                        className="settings-textfield"
                        type="password"
                        defaultValue=""
                        placeholder="Current Password"
                        ref="currentPassword"
                        />
                    <br />

                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <FormControl
                        className="settings-textfield"
                        type="password"
                        defaultValue=""
                        placeholder="New Password"
                        ref="newPassword"
                        />

                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <FormControl
                        className="settings-textfield"
                        type="password"
                        defaultValue=""
                        placeholder="Confirm Password"
                        ref="confirmPassword"
                        />
                </FormGroup>
            </div>



		return (
			<header className="app-header navbar">
				<Modal isOpen={this.state.showModal} onHide={this.toggleModal} toggle={this.toggleModal} className="modal-dailog">

					<ModalBody>
                        <div className="settings-user-email">
                                <strong> Email: </strong> {this.props.user.detail.email}
                        </div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1'); }}
                                >
                                Edit Account
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}
                                >
                                Change Password
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                {editAccountForm}
                            </TabPane>
                            <TabPane tabId="2">
                                {changePasswordForm}
                            </TabPane>
                        
                        </TabContent>
						
					</ModalBody>
					<ModalFooter>
						<Button color="primary" >Save</Button>						
						<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
					</ModalFooter>
				</Modal>
				<button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
				<a href="#" className="navbar-brand" ></a>
				<ul className="nav navbar-nav d-md-down-none">
					<li className="nav-item">
						<a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle} href="#">&#9776;</a>
					</li>
				</ul>

				<ul className="nav navbar-nav ml-auto">
					<li className="nav-item dropdown">
						<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
							<a onClick={this.toggle} className="nav-link avatar" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
								<img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
							</a>

							<DropdownMenu className="dropdown-menu-right">

								<DropdownItem onClick={this.toggleModal}><i className="fa fa-wrench"></i> Settings</DropdownItem>
								<DropdownItem onClick={this.handleLogoutClick}><i className="fa fa-lock"></i> Logout</DropdownItem>

							</DropdownMenu>
						</Dropdown>
					</li>
					<li className="nav-item d-md-down-none">
						{/*<a className="nav-link navbar-toggler aside-menu-toggler" onClick={this.asideToggle} href="#">&#9776;</a>*/}
					</li>
				</ul>
			</header>
		)
	}
}

export default Header;

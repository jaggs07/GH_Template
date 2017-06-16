import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick (e) {
    e.preventDefault()
    e.target.parentElement.classList.toggle('open')
  }

  activeRoute (routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown'
  }

  render () {
   var sideNavbar = null;

   if(this.props.user.detail.type === 'admin'){


     sideNavbar =  <ul className='nav'>
                          <li className='nav-item'>
                            <NavLink to={'/dashboard'} className='nav-link' activeClassName='active'>
                              <i className='icon-speedometer'></i> Dashboard
                            </NavLink>
                          </li>
                          <li className='nav-item'>
                            <NavLink to={'/users'} className='nav-link' activeClassName='active'>
                              <i className='icon-user'></i> Users
                            </NavLink>
                          </li>


                          <li className="nav-item">
                            <NavLink to={'/employers'} className="nav-link" activeClassName="active">
                              <i className="fa fa-building"></i> 
                              Employers
                            </NavLink>
                          </li>

                          <li className="nav-item">
                            <NavLink to={'/jobs'} className="nav-link" activeClassName="active">
                              <i className="fa fa-suitcase"></i> 
                              Jobs
                            </NavLink>
                          </li>
                        </ul>
   }else{
     sideNavbar = <ul className='nav'>
                          <li className='nav-item'>
                            <NavLink to={'/dashboard'} className='nav-link' activeClassName='active'>
                              <i className='icon-speedometer'></i> Dashboard
                            </NavLink>
                          </li>
          
                          <li className="nav-item">
                            <NavLink to={'/jobs'} className="nav-link" activeClassName="active">
                              <i className="fa fa-suitcase"></i> 
                              Jobs
                            </NavLink>
                          </li>
                        </ul>
  }

    return (

      <div className='sidebar'>
        <nav className='sidebar-nav'>
         {sideNavbar}
        </nav>
      </div>
    )
  }
}

export default Sidebar

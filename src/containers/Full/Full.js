import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../../containers/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Dashboard from '../../containers/Dashboard/'
import Users from '../../containers/Users/'
import Employers from '../../containers/Employers/'
import Jobs from '../../views/Jobs/'


class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/users" name="Users" component={Users}/>
                <Route path="/employers" name="Employers" component={Employers}/>
                <Route path="/Jobs" name="Jobs" component={Jobs}/>

                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;

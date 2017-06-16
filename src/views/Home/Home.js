import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../../containers/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';
import { hashHistory } from 'react-router'
import Cookie from 'universal-cookie';

import Dashboard from '../../containers/Dashboard/'
import Users from '../../containers/Users/'
import Employers from '../../containers/Employers/'
import Jobs from '../../containers/Jobs/'

const cookies = new Cookie();

class Home extends Component {

      componentWillMount = () => {

        var token = cookies.get('token');

        if(typeof token !== 'undefined'){

            this.props.userDetail(token.token);
        }else{
            hashHistory.push('/login');
        }
    }


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

export default Home;
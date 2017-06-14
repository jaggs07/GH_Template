import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import Charts from '../../views/Charts/'
import Widgets from '../../views/Widgets/'

// Components
import Buttons from '../../views/Components/Buttons/'
import Cards from '../../views/Components/Cards/'
// import Forms from '../../views/Components/Forms/'
import Modals from '../../views/Components/Modals/'
import SocialButtons from '../../views/Components/SocialButtons/'
import Switches from '../../views/Components/Switches/'

import Users from '../../views/Users/'
import Employers from '../../views/Employers/'
import Jobs from '../../views/Jobs/'


import Tables from '../../views/Users/'
import Tabs from '../../views/Components/Tabs/'

// Forms
import BasicForms from '../../views/Forms/BasicForms/'
import AdvancedForms from '../../views/Forms/AdvancedForms'

// Icons
import FontAwesome from '../../views/Icons/FontAwesome/'
import Glyphicons from '../../views/Icons/Glyphicons/'
import GlyphiconsFiletypes from '../../views/Icons/GlyphiconsFiletypes/'
import GlyphiconsSocial from '../../views/Icons/GlyphiconsSocial/'
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/'

// Plugins
import LoadingButtons from '../../views/Plugins/LoadingButtons/'
import Spinners from '../../views/Plugins/Spinners/'

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
                <Route path="/users" name="Dashboard" component={Users}/>
                <Route path="/employers" name="Dashboard" component={Employers}/>
                <Route path="/Jobs" name="Dashboard" component={Jobs}/>

                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;

import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import {Login} from './components/auth/Login';
import {Register} from './components/auth/Register';
import {Profile} from './components/profile/Profile';
import { Chat } from './components/Chat/Chat';
import {ManageUsers} from './components/manage/ManageUsers'
import {ManageChats} from './components/manage/ManageChats'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/chat' component={Chat} />
            <Route exact path='/manageUsers' component={ManageUsers} />
            <Route exact path='/manageChats' component={ManageChats} />
        </div>
    );
  }
}

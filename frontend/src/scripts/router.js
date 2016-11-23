import React from 'react'
import LoginPageController from './components/login-page/controller.login.page'
import UserPage from './components/user.page'
import {Router, Route, browserHistory} from 'react-router'

export default(
  <Router history={browserHistory}>
    <Route path='/' component={LoginPageController} />
    <Route path='userpage' component={UserPage} />
  </Router>
);
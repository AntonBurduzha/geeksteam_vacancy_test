import React from 'react'
import LoginPageController from './components/controllers/controller.login.page'
import UserPage from './components/views/view.user.page'
import {Router, Route, browserHistory} from 'react-router'

export default(
  <Router history={browserHistory}>
    <Route path='/' component={LoginPageController} />
    <Route path='userpage' component={UserPage} />
  </Router>
);
import React from 'react'
import ReactDOM from 'react-dom'
//import Login from './components/login.page'
import LoginPageController from './components/login-page/controller.login.page'
import UserPage from './components/user.page'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={LoginPageController} />
    <Route path='userpage' component={UserPage} />
  </Router>,
  document.getElementById('root')
);


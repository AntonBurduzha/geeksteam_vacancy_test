import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/login.page'
import UserPage from './components/user.page'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Login} />
    <Route path='userpage' component={UserPage} />
  </Router>,
  document.getElementById('root')
);


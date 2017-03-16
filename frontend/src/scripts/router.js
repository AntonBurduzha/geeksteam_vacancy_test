import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import LoginPageController from './components/controllers/controller.login.page'
import UserPage from './components/views/view.user.page'

export default(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={LoginPageController} />
      <Route path='/userpage' component={UserPage} />
    </div>
  </BrowserRouter>
);
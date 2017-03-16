import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import LoginPageView from '../views/view.login.page'

import store from '../../store'
import actionCheckUserData from '../../actions/action.login'
import postUserData from '../../api/api.login'

class LoginPageController extends Component {
  constructor(props){
    super(props);
    this.applyUserVerification = this.applyUserVerification.bind(this);//send req to server
    this.getInputedPassword = this.getInputedPassword.bind(this);//get string from input and set state.password
    this.getInputedLogin = this.getInputedLogin.bind(this);//get string from input and set state.login
    this.verifyLogin = this.verifyLogin.bind(this);//check response from server and show result

    this.state = {
      'login': '',
      'password': '',
      'pending': false,
    };
  }

  getInputedLogin(event){
    this.setState({'login': event.target.value});
  }

  getInputedPassword(event){
    this.setState({'password': event.target.value});
  }

  componentDidUpdate(){
    let btnLoading = document.querySelector('.btn-loading');
    let btnLogin = document.querySelector('.btn-login');
    if(this.state.pending){
      btnLogin.style.display = 'none';
      btnLoading.style.display = 'block';
    }
    else{
      btnLogin.style.display = 'block';
      btnLoading.style.display = 'none';
    }
  }

  verifyLogin(res){
    this.setState({'pending': false});
    if(res.Auth === "Denied"){
      let userNameField = document.querySelector('.input-login');
      let passwordField = document.querySelector('.input-password');
      userNameField.classList.add('input-login-wrong');
      userNameField.value = '';
      passwordField.value = '';
    }
    else {
      this.props.history.push('/userpage');
    }
  }

  applyUserVerification(event){
    event.preventDefault();
    let self = this;
    self.setState({'pending': true});

    postUserData(self.state.login, self.state.password)
      .then(result => {
        store.dispatch(actionCheckUserData(result));
        self.verifyLogin(this.props.resData);
      });
  }

  render(){
    return(
      <div className="row">
        <LoginPageView
          getInputedLogin={this.getInputedLogin}
          getInputedPassword={this.getInputedPassword}
          applyUserVerification={this.applyUserVerification}
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    resData: state
  };
};

export default connect(mapStateToProps)(withRouter(LoginPageController));
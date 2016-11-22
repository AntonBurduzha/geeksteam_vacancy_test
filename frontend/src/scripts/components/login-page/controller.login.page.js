import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import LoginPageView from './view.login.page'

export default class LoginPageController extends Component {
  constructor(props){
    super(props);
    this.applyUserValidation = this.applyUserValidation.bind(this);//send req to server
    this.getInputedPassword = this.getInputedPassword.bind(this);//get string from input and set state.password
    this.getInputedLogin = this.getInputedLogin.bind(this);//get string from input and set state.login
    this.applyLogin = this.applyLogin.bind(this);//check response from server and show result

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

  applyLogin(res){
    this.setState({'pending': false});

    if(res.Auth === "Denied"){
      let userNameField = document.querySelector('.input-login');
      let passwordField = document.querySelector('.input-password');
      userNameField.classList.add('input-login-wrong');
      userNameField.value = '';
      passwordField.value = '';
    }
    else {
      browserHistory.push('/userpage');
    }
  }

  applyUserValidation(event){
    event.preventDefault();

    let self = this;
    self.setState({'pending': true});

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'Username': self.state.login,
        'Password': self.state.password,
      })
    }).then(response => {
      response.json().then(result => {
        let access = result;
        self.applyLogin(access);
      });
    });
  }

  render(){
    return(
      <div className="row">
        <LoginPageView
          getInputedLogin={this.getInputedLogin}
          getInputedPassword={this.getInputedPassword}
          applyUserValidation={this.applyUserValidation}
        />
      </div>
    );
  }
}
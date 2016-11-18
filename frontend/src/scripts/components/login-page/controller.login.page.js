import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import LoginPageView from './view.login.page'

export default class LoginPageController extends React.Component {
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
    var self = this;
    self.setState({'login': event.target.value});
  }

  getInputedPassword(event){
    var self = this;
    self.setState({'password': event.target.value});
  }

  componentDidUpdate(){
    var self = this;
    let btnLoading = document.querySelector('.btn-loading');
    let btnLogin = document.querySelector('.btn-login');

    if(self.state.pending){
      btnLogin.style.display = 'none';
      btnLoading.style.display = 'block';
    }
    else{
      btnLogin.style.display = 'block';
      btnLoading.style.display = 'none';
    }
  }

  applyLogin(res){
    var self = this;
    self.setState({'pending': false});

    if(res.Auth === "Denied"){
      let userNameField = document.querySelector('.input-login');
      let passwordField = document.querySelector('.input-password');
      userNameField.style.borderColor = 'red';
      userNameField.style.borderWidth = '1px';
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

    let params = JSON.stringify({
      'Username': self.state.login,
      'Password': self.state.password
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = () => {
      if(xhr.status === 200 && xhr.readyState == 4){
        let access = JSON.parse(xhr.responseText);
        self.applyLogin(access);
      }
    };
    xhr.send(params);
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
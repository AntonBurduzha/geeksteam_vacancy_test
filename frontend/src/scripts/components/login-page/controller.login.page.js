import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import store from '../../store'
import checkLogin from '../../actions/action.types'
import LoginPageView from './view.login.page'

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
      browserHistory.push('/userpage');
    }
  }

  applyUserVerification(event){
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
        store.dispatch(checkLogin(result));
        self.verifyLogin(this.props.resData);
      });
    });
  }

  render(){
    return(
      <div className="row">
        <LoginPageView
          getInputedLogin={this.getInputedLogin}
          getInputedPassword={this.getInputedPassword}
          applyUserValidation={this.applyUserVerification}
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

export default connect(mapStateToProps)(LoginPageController);
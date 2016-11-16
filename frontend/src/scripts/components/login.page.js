import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {browserHistory} from 'react-router'

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.applyUserValidation = this.applyUserValidation.bind(this);//send req to server
    this.getInputedPassword = this.getInputedPassword.bind(this);//get string from input and set state.password
    this.getInputedLogin = this.getInputedLogin.bind(this);//get string from input and set state.login
    this.applyLogin = this.applyLogin.bind(this);//check response from server and show result

    this.state = {
      'login': '',
      'password': '',
      'pending': false
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
    let btnLoading = ReactDOM.findDOMNode(self.refs.btnLoading);
    let btnLogin = ReactDOM.findDOMNode(self.refs.btnLogin);

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
      let userNameField = ReactDOM.findDOMNode(self.refs.inputLogin);
      let passwordField = ReactDOM.findDOMNode(self.refs.inputPassword);
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
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4">
          <div className="article-login">
            <img className="img-logo" src="../img/logo.jpg" alt="logo"/>
            <h3 className="title-main">Login</h3>
          </div>
          <form className="form-login">
            <input
              className="form-control"
              type="text"
              defaultValue=''
              placeholder='Login'
              ref='inputLogin'
              onChange={this.getInputedLogin}
            />
            <input
              className="form-control"
              type="text"
              defaultValue=''
              placeholder='Password'
              ref='inputPassword'
              onChange={this.getInputedPassword}
            />
            <button
              className="btn-submit"
              ref='btnLogin'>
              <Link to="/userpage" className="text-btn-link" onClick={this.applyUserValidation}>Login &#8594;</Link>
            </button>
            <button
              className="btn-submit btn-loading"
              ref='btnLoading'>
              <img className="logo-loading" src="../img/loading.jpg" alt="loading"/>
            </button>
          </form>
        </div>
      </div>
    )
  }
}
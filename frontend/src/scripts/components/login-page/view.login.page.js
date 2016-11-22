import React, {Component} from 'react'
import {Link} from 'react-router'

export default class LoginPageView extends Component {
  render(){
    return (
      <div className="col-md-offset-4 col-md-4">
        <div className="article-login">
          <img className="img-logo" src="../img/logo.jpg" alt="logo"/>
          <h3 className="title-main">Login</h3>
        </div>
        <form className="form-login">
          <input
            className="form-control input-login"
            type="text"
            defaultValue=''
            placeholder='Login'
            onChange={this.props.getInputedLogin}
          />
          <input
            className="form-control input-password"
            type="text"
            defaultValue=''
            placeholder='Password'
            onChange={this.props.getInputedPassword}
          />
          <button className="btn-submit btn-login">
            <Link to="/userpage" className="text-btn-link" onClick={this.props.applyUserValidation}>Login &#8594;</Link>
          </button>
          <button className="btn-submit btn-loading">
            <img className="logo-loading" src="../img/loading.jpg" alt="loading"/>
          </button>
        </form>
      </div>
    )
  }
}
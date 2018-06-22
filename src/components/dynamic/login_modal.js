import React, { Component } from 'react';
const $ = window.jQuery;

class LoginModal extends Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return true;
    }
    $('#login-modal').modal('hide');
  };

  render() {
    return (
    <div ref={node => this.node = node}>
      <div id="login-modal"
      className="modal fade user-modal"
      tabIndex="-1"
      data-width="760"
      style={{display: "none"}}>
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-sm-6 col-ms-6">
              <h4 className="title">Social Login</h4>
              <ul className="list-unstyled social-user">
                <li><a href="#"
                title="Login with Facebook"
                className="facebook"><i className="fa fa-facebook"/><span>Login with Facebook</span></a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-ms-6">
              <h4 className="title">Sign In</h4>
              <form role="form" action="your-login-script-goes-here.php">
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Password"/>
                </div>
                <div className="form-group checkbox small">
                  <label>
                    <input type="checkbox"/>
                    Remember Me </label>
                </div>
                <p className="text-center">
                  <button className="btn btn-default btn-custom" type="submit">
                    <i className="fa fa-lock"/> Sign in
                  </button>
                </p>
              </form>
            </div>
          </div>
          <p className="text-center"><a className="text-underline"
          href="your-link-here.html">Forgot your password?</a> <br/>
            Don't have an account yet? <a className="text-underline"
            href="#signup-modal"
            data-toggle="modal"
            data-dismiss="modal">Sign up</a></p>
        </div>
      </div>
    </div>
    )
  }
}

export default LoginModal;

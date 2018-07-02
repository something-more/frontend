import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../reducers/reducer_auth';
import decodeJWT from '../../../include/jwt_decode';

class AuthenticationState extends Component {
  // 인증 상태 렌더링 함수
  // sessionStorage 에 정보가 하나라도 없으면 로그인 / 회원가입 창을 띄우고
  // 그렇지 않으면 로그인 되었음을 보여준다
  render() {
    if (sessionStorage.length === 0) {
      return (
        <p>
          <a href="#login-modal" data-toggle="modal" className="toggle-login">
            <i className="fa fa-sign-in" />
&nbsp;&nbsp;Sign In
          </a>
          <span className="v-divider" />
          <a href="#signup-modal" data-toggle="modal" className="toggle-signup">
            <i className="fa fa-pencil" />
&nbsp;&nbsp;Sign Up
          </a>
        </p>
      );
    }
    const decodedToken = decodeJWT(sessionStorage.getItem('token'));
    return (
      <div className="dropdown">
        <button
          className="btn btn-link dropdown-toggle"
          type="button"
          id="profileDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span className="text-muted">
            {decodedToken.email}
          </span>
          <span className="caret text-muted" />
        </button>
        <ul
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="profileDropdown"
        >
          {decodedToken.isStaff
            ? (
              <li>
                <Link to="/me/stories">
Stories
                </Link>
              </li>
            )
            : null}
          <li>
            <Link to="/me/settings">
Settings
            </Link>
          </li>
          <li role="separator" className="divider" />
          <li>
            <Link
              to="/"
              className="toggle-login"
              onClick={() => {
                this.props.signOut();
                window.location.reload();
              }}
            >
              <i className="fa fa-sign-out" />
&nbsp;&nbsp;Sign Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(null, { signOut })(AuthenticationState);

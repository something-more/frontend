import React, { Component } from 'react';
import { decodeJWT } from '../../../include/jwt_decode';

class SettingsIndex extends Component {

  state = {
    status: ''
  };

  renderSetPassword() {
    switch(this.state.status) {
      case 'password':
        return (<div>password</div>);

      case 'destroy':
        return (<div>destroy</div>);

      default:
        return null
    }
  }

  render() {
    const decodedToken = decodeJWT(sessionStorage.getItem('token'));

    return (
      <div className="content-col">
        <div className="inner-content">
          <h1 className="title">Settings</h1>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group">
                <li className="list-group-item active">
                  <strong>Email:&nbsp;</strong>
                  <span>{decodedToken.email}</span></li>
                <li
                  className="list-group-item"
                  style={{cursor: "pointer"}}
                  onClick={() => {this.setState({status: 'password'})}}>
                  <strong>패스워드 변경</strong>
                </li>
                <li
                  className="list-group-item"
                  style={{cursor: "pointer"}}
                  onClick={() => {this.setState({status: 'destroy'})}}
                  >
                  <strong className="text-danger">회원 탈퇴</strong>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              {this.renderSetPassword()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsIndex;

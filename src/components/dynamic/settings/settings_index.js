import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { listUsers } from '../../../reducers/reducer_admin';
import decodeJWT from '../../../include/jwt_decode';
import SettingsFields from './settings_fields';
import AlertError from '../structure/alert_error';

class SettingsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
    };
  }

  render() {
    const decodedToken = decodeJWT(sessionStorage.getItem('token'));

    return (
      <div className="inner-content fadeIn animated">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
Something More | 회원 정보 설정
          </title>
        </Helmet>
        <h1 className="title">
Settings
        </h1>
        <div className="row">
          <div className="col-md-4">
            <h4>
회원 정보
            </h4>
            <ul className="list-group">
              <li className="list-group-item active">
                <strong>
Email:&nbsp;
                </strong>
                <span>
                  {decodedToken.email}
                </span>
              </li>
              {decodedToken.isAdmin
                ? (
                  <li
                    className="list-group-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { this.setState({ status: 'admin' }); }}
                  >
                    <strong>
회원 관리
                    </strong>
                  </li>
                )
                : null}
              <li
                className="list-group-item"
                style={{ cursor: 'pointer' }}
                onClick={() => { this.setState({ status: 'nickname' }); }}
              >
                <strong>
                    닉네임 변경
                </strong>
              </li>
              <li
                className="list-group-item"
                style={{ cursor: 'pointer' }}
                onClick={() => { this.setState({ status: 'password' }); }}
              >
                <strong>
패스워드 변경
                </strong>
              </li>
              <li
                className="list-group-item"
                style={{ cursor: 'pointer' }}
                onClick={() => { this.setState({ status: 'destroy' }); }}
              >
                <strong className="text-danger">
회원 탈퇴
                </strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8">
            <SettingsFields onStatusChange={this.state.status} />
            <hr className="vertical-spacer" />
            <AlertError errors={this.props.error} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

export default connect(mapStateToProps, { listUsers })(SettingsIndex);

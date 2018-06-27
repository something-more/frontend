import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { destroyUser } from '../../../reducers/reducer_auth';
import { decodeJWT } from '../../../include/jwt_decode';

class SettingsIndex extends Component {

  state = {
    status: ''
  };

  errorAlert() {
    // 에러가 발견되면 경고창 띄움
    if (this.props.error) {
      return (
      <div className="alert alert-danger">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>{this.props.error}</strong>
      </div>
      )
    }
  }

  async onDestroy(values) {
    await this.props.destroyUser(values);

    if (!this.props.error) {
      await this.props.history.replace('/');
      await window.location.reload();
    }
  }

  renderSettings() {
    const { handleSubmit } = this.props;
    switch(this.state.status) {
      case 'password':
        return (<div>password</div>);

      case 'destroy':
        return (
        <div>
          <h4>회원 탈퇴</h4>
          <div className="panel panel-danger">
            <div className="panel-heading">
              <strong>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</strong>
            </div>
            <div className="panel-body">
              <label htmlFor="destroyPassword">Password</label>
              <form method="post" onSubmit={handleSubmit(this.onDestroy.bind(this))}>
              <div className="input-group">
                <Field type="password"
                className="form-control"
                id="destroyPassword"
                placeholder="Password"
                component="input"
                name="password"/>
                <span className="input-group-btn">
                  <button className="btn btn-danger" type="submit">Submit</button>
                </span>
              </div>
              </form>
              <small>정말로 탈퇴하시려면 다시 한번 패스워드를 입력해 주십시오.</small>
            </div>
          </div>
        </div>
        );

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
              <h4>회원 정보</h4>
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
              {this.renderSettings()}
              <hr className="vertical-spacer"/>
              {this.errorAlert()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error
  }
}

export default reduxForm({
  form: 'UserSettingForm'
})(
  connect(mapStateToProps, { destroyUser })(SettingsIndex)
);

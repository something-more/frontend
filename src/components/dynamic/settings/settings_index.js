import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { patchPassword, destroyUser } from '../../../reducers/reducer_auth';
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

  async onPatch(values) {
    await this.props.patchPassword(values);

    if (!this.props.error) {
      await window.location.reload();
    }
  }

  async onDestroy(values) {
    await this.props.destroyUser(values);

    if (!this.props.error) {
      await this.props.history.replace('/');
      await window.location.reload();
    }
  }

  renderPasswordField(field) {
    return (
      <div className="form-group">
        <label htmlFor={field.id}>{field.label}</label>
        <input
          className="form-control"
          placeholder={field.label}
          type="password"
          {...field.input}
        />
        <small className="text-danger">
          {field.meta.touched ? field.meta.error : ''}
        </small>
      </div>
    )
  }

  renderSettings() {
    const { handleSubmit } = this.props;
    switch(this.state.status) {
      case 'password':
        return (
        <div>
          <h4>패스워드 변경</h4>
          <div className="panel panel-info">
            <div className="panel-body">
              <form method="post" onSubmit={handleSubmit(this.onPatch.bind(this))}>
                <Field
                id="newPassword1"
                name="password1"
                label="New Password"
                component={this.renderPasswordField}
                />
                <Field
                id="newPassword2"
                name="password2"
                label="Repeat Password"
                component={this.renderPasswordField}
                />
                <button type="submit" className="btn btn-info">Submit</button>
              </form>
            </div>
          </div>
        </div>
        );

      case 'destroy':
        return (
        <div>
          <h4>회원 탈퇴</h4>
          <div className="panel panel-danger">
            <div className="panel-heading">
              <strong>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</strong>
            </div>
            <div className="panel-body">
              <form method="post" onSubmit={handleSubmit(this.onDestroy.bind(this))}>
                <Field
                id="destroyPassword"
                name="password"
                label="Password"
                component={this.renderPasswordField}
                />
                <button type="submit" className="btn btn-danger">Submit</button>
              </form>
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

function validate(values) {
  console.log(values);
  const errors = {};

  if (values.password1 !== values.password2) {
    errors.password2 = '패스워드가 서로 다릅니다';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'UserSettingForm'
})(
  connect(mapStateToProps, { patchPassword, destroyUser })(SettingsIndex)
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { adminSignUp } from '../../reducers/reducer_auth';

class AdminSignUp extends Component {

  async onSubmit(values) {
    await this.props.adminSignUp(values);

    if (!this.props.error) {
      window.location.replace('/');
    }
  }

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

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="content-col">
        <div
          className="row"
          style={{
            margin: "100px 0",
            padding: "0 10px"}}>
          <div className="col-md-6 col-md-offset-3">
            <h4 className="title">관리자 회원 가입</h4>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="form-group">
                <Field
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  component="input"/>
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  component="input"/>
              </div>
              <p className="text-center">
                <button className="btn btn-default btn-custom" type="submit">
                  <i className="fa fa-lock"/> 회원 가입
                </button>
              </p>
            </form>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3 text-center">
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
  form: 'AdminSignUpForm'
})(
  connect(mapStateToProps, { adminSignUp })(AdminSignUp)
);

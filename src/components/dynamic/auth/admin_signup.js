import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { adminSignUp } from '../../../reducers/reducer_auth';
import AlertError from '../structure/alert_error';

class AdminSignUp extends Component {

  async onSubmit(values) {
    await this.props.adminSignUp(values);

    if (!this.props.error) {
      window.location.replace('/');
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
            <form method="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
              <AlertError errors={this.props.error}/>
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

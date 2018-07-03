import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../../../reducers/reducer_auth';
import { PasswordField } from '../structure/input_fields';
import AlertError from '../structure/alert_error';

const $ = window.jQuery;

class SignUpModal extends Component {
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
    $('#signup-modal').modal('hide');
  };

  async onSubmit(values) {
    await this.props.signUp(values);

    // 에러가 발견되지 않으면 새로고침
    if (!this.props.error) {
      await window.location.reload();
    }
  }

  render() {
    // this.props 에 handleSubmit 상수를 추가한다
    const { handleSubmit } = this.props;

    return (
    <div ref={node => this.node = node}>
      <div id="signup-modal"
      className="modal fade user-modal"
      tabIndex="-1"
      data-width="760"
      style={{display: "none"}}>
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true">×</button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-sm-6 col-ms-6">
              <h4 className="title">Sign Up with...</h4>
              <ul className="list-unstyled social-user">
                <li>
                  <a
                  title="Signup with Facebook"
                  className="facebook">
                    <i className="fa fa-facebook"/>
                    <span>Signup with Facebook</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-ms-6">
              <h4 className="title">회원 가입</h4>
              <form method="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="form-group">
                  <Field
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    component="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Nickname"
                    component="input"
                    required
                  />
                </div>
                <Field
                name="password1"
                label="New Password"
                component={PasswordField}
                required
                />
                <Field
                name="password2"
                label="Repeat Password"
                component={PasswordField}
                required
                />
                <p className="text-center">
                  <button className="btn btn-default btn-custom" type="submit">
                    <i className="fa fa-lock"/>&nbsp;회원 가입
                  </button>
                </p>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 text-center">
              <AlertError errors={this.props.error}/>
            </div>
          </div>
          <p className="text-center">이미 계정이 있으신가요?&nbsp;
            <a
            className="text-underline"
            href="#login-modal"
            data-toggle="modal"
            data-dismiss="modal">로그인</a>
          </p>
        </div>
      </div>
    </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if (values.password1 !== values.password2) {
    errors.password2 = '패스워드가 서로 다릅니다';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    error: state.auth.error
  }
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(
  connect(mapStateToProps, { signUp })(SignUpModal)
);

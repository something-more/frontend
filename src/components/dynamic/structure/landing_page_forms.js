import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {PasswordField} from './input_fields';
import {signIn, signUp, resetPassword} from '../../../reducers/reducer_auth';

class LandingPageForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: 'signIn',
    };
  }

  async onSignUp(values) {
    await this.props.signUp(values);

    if (!this.props.error) {
      alert('가입하신 이메일 주소로 인증 메일이 발송되었습니다. 이메일 수신함을 확인해주세요');
      this.setState({ form: 'signIn' });
    }
  }

  async onSignIn(values) {
    await this.props.signIn(values);

    // 에러가 발견되지 않으면 창을 없애고 새로고침
    if (!this.props.error) {
      sessionStorage.setItem('display', 'none');
      const initBox = document.getElementById('init-box');
      initBox.style.display = sessionStorage.getItem('display');
      window.location.replace('/');
    }
  }

  async onReset(values) {
    await this.props.resetPassword(values.email);

    if (!this.props.error) {
      alert('입력하신 이메일 주소로 패스워 초기화 메일이 발송되었습니다. 이메일 수신함을 확인해주세요');
      this.setState({ form: 'signIn' });
    }
  }

  signUpForm() {
    const { handleSubmit } = this.props;

    return (
    <Fragment>
      <form
      method="post"
      className="center-block"
      style={{ maxWidth: '200px' }}
      onSubmit={handleSubmit(this.onSignUp.bind(this))}
      >
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
          name="nickname"
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
            <i className="fa fa-lock" />
            &nbsp;회원 가입
          </button>
        </p>
      </form>
      <p>
        계정이 있으신가요?&nbsp;
        <a
        className="text-underline"
        onClick={() => { this.setState({ form: 'signIn' }); }}
        >
          로그인
        </a>
      </p>
    </Fragment>
    );
  }

  signInForm() {
    const { handleSubmit } = this.props;

    return (
    <Fragment>
      <form
      method="post"
      className="center-block"
      style={{ maxWidth: '200px' }}
      onSubmit={handleSubmit(this.onSignIn.bind(this))}
      >
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
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          component="input"
          required
          />
        </div>
        <p className="text-center">
          <button className="btn btn-default btn-custom" type="submit">
            <i className="fa fa-lock" />
            &nbsp;로그인
          </button>
        </p>
      </form>
      <p>
        아직 계정이 없으신가요?&nbsp;
        <a
        className="text-underline"
        onClick={() => { this.setState({ form: 'signUp' }); }}
        >
          회원 가입
        </a>
      </p>
      <p>
        패스워드를 잊으셨나요?&nbsp;
        <a
        className="text-underline"
        onClick={() => { this.setState({ form: 'reset' }); }}
        >
          초기화
        </a>
      </p>
    </Fragment>
    );
  }

  resetForm() {
    const { handleSubmit } = this.props;

    return (
      <form
      method="post"
      className="center-block"
      style={{ maxWidth: '200px' }}
      onSubmit={handleSubmit(this.onReset.bind(this))}
      >
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
        <p className="text-center">
          <button className="btn btn-default btn-custom" type="submit">
            <i className="fa fa-lock" />
            &nbsp;패스워드 초기화 메일 발송
          </button>
        </p>
        <p>
          패스워드가 기억나셨나요?&nbsp;
          <a
          className="text-underline"
          onClick={() => { this.setState({ form: 'signIn' }); }}
          >
            로그인
          </a>
        </p>
      </form>
    );
  }

  render() {
    switch (this.state.form) {
      case 'signIn':
        return (this.signInForm());

      case 'signUp':
        return (this.signUpForm());

      case 'reset':
        return (this.resetForm());

      default:
        return null;
    }
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
    error: state.auth.error,
  };
}

export default reduxForm({
  validate,
  form: 'LandingPageForm',
})(
  connect(mapStateToProps, { signIn, signUp, resetPassword })(LandingPageForms),
);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn, signUp } from '../../../reducers/reducer_auth';
import logoImg from '../../../assets/images/logo/img_logo.svg';
import logoText from '../../../assets/images/logo/text_logo_horizontal.png';
import AlertError from './alert_error';
import { PasswordField } from './input_fields';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: 'signIn',
    };
  }

  async onSignUp(values) {
    await this.props.signUp(values);

    if (!this.props.error) {
      alert('회원가입이 완료되었습니다. 로그인해주세요');
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
      </Fragment>
    );
  }

  render() {
    if (!sessionStorage.getItem('display')) {
      return (
        <div id="init-box">
          <div className="aligner">
            <div className="aligner-item text-center fadeIn animated">
              <div style={{ marginBottom: '20px' }}>
                <img
                  src={logoImg}
                  style={{ maxWidth: '200px' }}
                  className="img-responsive center-block"
                  alt="logo-img"
                />
                <img
                  src={logoText}
                  className="img-responsive"
                  alt="logo-text"
                />
              </div>
              {this.state.form === 'signIn' ? this.signInForm() : this.signUpForm()}
              <AlertError errors={this.props.error} />
            </div>
          </div>
        </div>
      );
    }
    return null;
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
  connect(mapStateToProps, { signIn, signUp })(LandingPage),
);

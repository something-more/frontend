import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../../../reducers/reducer_auth';
import logoImg from '../../../assets/images/logo/img_logo.svg';
import logoText from '../../../assets/images/logo/text_logo_horizontal.png';
import AlertError from './alert_error';

class LandingPage extends Component {
  async onSubmit(values) {
    await this.props.signIn(values);

    // 에러가 발견되지 않으면 창을 없애고 새로고침
    if (!this.props.error) {
      sessionStorage.setItem('display', 'none');
      const initBox = document.getElementById('init-box');
      initBox.style.display = sessionStorage.getItem('display');
      window.location.replace('/');
    }
  }

  render() {
    const { handleSubmit } = this.props;

    if (!sessionStorage.getItem('display')) {
      return (
        <div id="init-box">
          <div className="aligner">
            <div className="aligner-item text-center fadeIn animated">
              <div style={{ marginBottom: '20px' }}>
                <img src={logoImg} className="img-responsive" alt="logo-img" />
                <img src={logoText} className="img-responsive" alt="logo-text" />
              </div>
              <form method="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="form-group">
                  <Field
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    component="input"
                  />
                </div>
                <div className="form-group">
                  <Field
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    component="input"
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
                  href="#signup-modal"
                  data-toggle="modal"
                  data-dismiss="modal"
                >
회원 가입
                </a>
              </p>
              <AlertError errors={this.props.error} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

export default reduxForm({
  form: 'LandingPageLoginForm',
})(
  connect(mapStateToProps, { signIn })(LandingPage),
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../../../reducers/reducer_auth';
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
                  href="#"
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
          </div>
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 text-center">
              <AlertError errors={this.props.error}/>
            </div>
          </div>
          <p className="text-center">Already have an account?
            <a
            className="text-underline"
            href="#login-modal"
            data-toggle="modal"
            data-dismiss="modal">Login</a>
          </p>
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
  form: 'SignUpForm'
})(
  connect(mapStateToProps, { signUp })(SignUpModal)
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { patchPassword } from '../../../reducers/reducer_auth';
import PasswordField from '../structure/password_field';

class NewPasswords extends Component {

  async onPatch(values) {
    await this.props.patchPassword(values);

    if (!this.props.error) {
      await window.location.reload();
    }
  }

  render() {
    const {handleSubmit} = this.props;

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
            component={PasswordField}
            />
            <Field
            id="newPassword2"
            name="password2"
            label="Repeat Password"
            component={PasswordField}
            />
            <button type="submit" className="btn btn-info">Submit</button>
          </form>
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

export default reduxForm({
  validate,
  form: 'NewPasswordsForm'
})(
  connect(null, { patchPassword })(NewPasswords)
);

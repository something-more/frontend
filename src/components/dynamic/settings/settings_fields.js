import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { destroyUser } from '../../../reducers/reducer_auth';
import Users from './settings_users';
import NewPasswords from './settings_passwords';

class SettingsFields extends Component {

  async onDestroy(values) {
    await this.props.destroyUser(values);

    if (!this.props.error) {
      await this.props.history.replace('/');
      await window.location.reload();
    }
  }

  render() {
    const {handleSubmit} = this.props;
    switch (this.props.onStatusChange) {
      case 'admin':
        return(<Users/>);

      case 'password':
        return (<NewPasswords/>);

      case 'destroy':
        return (<div>
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
        </div>);

      default:
        return null
    }
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
  connect(mapStateToProps, { destroyUser })(SettingsFields)
);

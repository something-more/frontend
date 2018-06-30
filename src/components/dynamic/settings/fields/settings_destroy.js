import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { destroyUser } from '../../../../reducers/reducer_auth';
import { PasswordField }from '../../structure/input_fields';

class DestroyUser extends Component {

  async onDestroy(values) {
    await this.props.destroyUser(values);

    if (!this.props.error) {
      await this.props.history.replace('/');
      await window.location.reload();
    }
  }

  render() {
    const {handleSubmit} = this.props;

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
              component={PasswordField}
              />
              <button type="submit" className="btn btn-danger">Submit</button>
            </form>
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
  form: "UserDestroyForm"
})(
  connect(mapStateToProps, { destroyUser })(DestroyUser)
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { patchNickname } from '../../../../reducers/reducer_auth';
import decodeJWT from '../../../../include/jwt_decode';

class NewNickname extends Component {
  async onPatch(values) {
    await this.props.patchNickname(values);

    if (!this.props.error) {
      await alert('닉네임이 변경되었습니다');
    }
  }

  render() {
    const decodedToken = decodeJWT(sessionStorage.getItem('token'));
    const { handleSubmit } = this.props;
    return (
      <div className="fadeIn animated">
        <h4>
        닉네임 변경
        </h4>
        <div className="panel panel-primary">
          <div className="panel-body">
            <h5>
현재 닉네임:&nbsp;
              <strong>
                {decodedToken.nickname}
              </strong>
            </h5>
            <form method="post" onSubmit={handleSubmit(this.onPatch.bind(this))}>
              <div className="form-group">
                <Field
                  type="text"
                  name="nickname"
                  className="form-control"
                  placeholder="New Nickname"
                  component="input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
              Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

export default reduxForm({
  form: 'NewNicknameForm',
})(
  connect(mapStateToProps, { patchNickname })(NewNickname),
);

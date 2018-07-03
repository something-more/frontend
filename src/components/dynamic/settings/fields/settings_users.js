import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { listUsers, updateUserAuth } from '../../../../reducers/reducer_admin';
import AlertError from '../../structure/alert_error';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateAuthorization: false,
      userEmail: '',
    };

    this.props.listUsers();
  }

  async onUpdate(values) {
    const { auth } = values;

    const payload = {
      email: this.state.userEmail,
      is_admin: false,
      is_staff: false,
    };

    if (auth === 'admin') {
      payload.is_admin = true;
      payload.is_staff = true;
    } else if (auth === 'staff') {
      payload.is_staff = true;
    }

    const isConfirm = window.confirm('정말 등급을 변경하시겠습니까?');

    if (isConfirm) {
      await this.props.updateUserAuth(payload);
    }

    if (isConfirm && !this.props.error) {
      await window.location.reload();
    }
  }

  renderUpdate() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">
Toggle navigation
                </span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand">
                {this.state.userEmail}
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <form
                method="post"
                onSubmit={handleSubmit(this.onUpdate.bind(this))}
                className="navbar-form navbar-right"
              >
                <div className="form-group" style={{ marginRight: '10px' }}>
                  <Field name="auth" className="form-control" id="updateAuth" component="select">
                    <option value="" disabled selected>
등급 선택
                    </option>
                    <option value="admin">
관리자
                    </option>
                    <option value="staff">
필진
                    </option>
                    <option value="normal">
일반
                    </option>
                  </Field>
                </div>
                <button type="submit" className="btn btn-default">
Submit
                </button>
              </form>
            </div>
          </div>
        </nav>
        <AlertError errors={this.props.error} />
      </Fragment>
    );
  }

  renderUsers() {
    return this.props.users.map((user) => {
      // 인덱스 번호
      const indexNum = this.props.users.indexOf(user) + 1;
      return (
        <tr key={user.id}>
          <td>
            {indexNum}
          </td>
          <td>
            {user.email}
          </td>
          <td>
            <a
              style={{ cursor: 'pointer' }}
              onClick={() => {
                this.setState({
                  updateAuthorization: true,
                  userEmail: user.email,
                });
              }}
            >
              {user.is_admin ? '관리자' : user.is_staff ? '필진' : '일반'}
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="fadeIn animated">
        <h4>
회원 등급 관리
        </h4>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <strong>
유저를 필진이나 관리자로 등급 조정을 할 수 있는 곳입니다.
            </strong>
          </div>
          <div className="panel-body">
            <table className="table table-hover table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th className="text-center">
번호
                  </th>
                  <th className="text-center">
이메일
                  </th>
                  <th className="text-center">
등급
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderUsers()}
              </tbody>
            </table>
          </div>
          {this.state.updateAuthorization
            ? (
              <div className="panel-footer">
                {this.renderUpdate()}
              </div>
            )
            : ''}
        </div>
      </div>
    );
  }
}

function validate(values) {
  console.log(values);
  const errors = {};

  if (!values.auth) {
    errors.auth = '등급을 선택하셔야 합니다';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    users: state.admin.list,
    error: state.admin.error,
  };
}

export default reduxForm({
  validate,
  form: 'UserAuthUpdateForm',
})(
  connect(mapStateToProps, { listUsers, updateUserAuth })(Users),
);

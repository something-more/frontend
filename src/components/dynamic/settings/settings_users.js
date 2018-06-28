import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listUsers } from '../../../reducers/reducer_admin';

class Users extends Component {
  componentDidMount() {
    this.props.listUsers()
  }

  renderUsers() {
    return this.props.users.map((user) => {
      // 인덱스 번호
      const indexNum = this.props.users.indexOf(user) + 1;
      return (
      <tr key={user.id}>
        <td>{indexNum}</td>
        <td>{user.email}</td>
        <td>{user.is_admin ? '관리자' : user.is_staff ? '필진' : '일반'}</td>
      </tr>
      )
    })
  }

  render() {
    return (
    <div>
      <h4>회원 등급 관리</h4>
      <div className="panel panel-warning">
        <div className="panel-heading">
          <strong>유저를 필진이나 관리자로 등급 조정을 할 수 있는 곳입니다.</strong>
        </div>
        <table className="table table-hover table-striped table-bordered text-center">
          <thead>
          <tr>
            <th className="text-center">번호</th>
            <th className="text-center">이메일</th>
            <th className="text-center">등급</th>
          </tr>
          </thead>
          <tbody>
          {this.renderUsers()}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.admin.list
  }
}

export default connect(mapStateToProps, { listUsers })(Users);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectAuthor } from '../../../reducers/reducer_author';
import { signOut } from '../../../reducers/reducer_auth';
import { decodeJWT } from '../../../include/jwt_decode';

class Navigation extends Component {

  // 인증 상태 렌더링 함수
  // sessionStorage 에 정보가 하나라도 없으면 로그인 / 회원가입 창을 띄우고
  // 그렇지 않으면 로그인 되었음을 보여준다
  renderAuthenticationState() {
    if (sessionStorage.length !== 1) {
      return (
      <p>
        <a href="#login-modal" data-toggle="modal" className="toggle-login">
          <i className="fa fa-sign-in"/>&nbsp;&nbsp;Sign In</a>
        <span className="v-divider"/>
        <a href="#signup-modal" data-toggle="modal" className="toggle-signup">
          <i className="fa fa-pencil"/>&nbsp;&nbsp;Sign Up</a>
      </p>)
    } else {
      const retrieveData = decodeJWT(sessionStorage.getItem('token'));
      return (
          <div className="dropdown">
            <button className="btn btn-link dropdown-toggle"
            type="button"
            id="profileDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true">
              <span className="text-muted">{retrieveData.email}</span>
              <span className="caret"/>
            </button>
            <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li role="separator" className="divider"/>
              <li>
                <Link
                  to={'/'}
                  className="toggle-login"
                  onClick={() => {this.props.signOut(); window.location.reload();}}>
                <i className="fa fa-sign-out">&nbsp;&nbsp;Sign Out</i>
              </Link>
              </li>
            </ul>
          </div>
      )
    }
  }

  // 필진 리스트 렌더링 함수
  // 리스트를 클릭하면 액션 생성자를 호출해 특정 필진 데이터를 리듀서로 옮긴다
  renderAuthors() {
    return this.props.authors.list.map((author) => {
      return (
      <li
      key={author.id}
      onClick={() => this.props.selectAuthor(author.id)}>
        <Link to={`/authors/${author.id}`}>
        {author.name_en}
        </Link>
      </li>
      )
    })
  }

  render() {
    return (
    <div className="nav-col" style={{"border": "none"}}>
      <div id="nav" className="clearfix" role="navigation">
        <div className="user-wrapper">
          {this.renderAuthenticationState()}
        </div>
        <ul className="primary-nav">
          <li className="active">
            <a href="/">Home</a>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li className="has-children">
            <a>Editors</a>
            <ul>
              {this.renderAuthors()}
            </ul>
          </li>
          <li>
            <a href="#">Stories</a>
          </li>
        </ul>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authors: state.author // author 리듀서 스테이트 전체를 authors prop 로 매핑
  }
}

export default connect(mapStateToProps, { selectAuthor, signOut })(Navigation);

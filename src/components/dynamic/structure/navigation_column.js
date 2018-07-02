import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectAuthor } from '../../../reducers/reducer_author';
import AuthenticationState from '../auth/auth_state';

const $ = window.jQuery;

class Navigation extends Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick() {
      // 사이드 바 메뉴를 클릭하면 빨간 불이 들어오도록
      $('.primary-nav a').click(function () {
        $(this).parent().tab('show');
      })
  };


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
    <div className="nav-col">
      <div id="nav" className="clearfix" role="navigation">
        <div className="user-wrapper">
          <AuthenticationState/>
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
            <a>Stories</a>
          </li>
          <li>
            <Link to="/notice">Notice</Link>
          </li>
          <li>
            <Link to="/board">Free Board</Link>
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

export default connect(mapStateToProps, { selectAuthor })(Navigation);

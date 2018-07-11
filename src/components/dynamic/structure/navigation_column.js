import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  selectAuthor, listAuthors, countStoryAuthor, listStoryAuthor,
}
  from '../../../reducers/reducer_author';
import AuthenticationState from '../auth/auth_state';

const $ = window.jQuery;

class Navigation extends Component {
  componentDidMount() {
    this.props.listAuthors();
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick() {
    // 사이드 바 메뉴를 클릭하면 빨간 불이 들어오도록
    $('.primary-nav a').click(function () {
      $(this).parent().tab('show');
    });

    $('.toggle-item').click(() => {
      $('html').removeClass('menu-open');
    });
  }


  // 필진 리스트 렌더링 함수
  // 리스트를 클릭하면 액션 생성자를 호출해 특정 필진 데이터를 리듀서로 옮긴다
  renderAuthors() {
    return _.map(this.props.memAuthors, author => (
      <li key={author.id}>
        <Link
          className="toggle-item"
          onClick={() => this.props.selectAuthor(author.id)}
          to={`/authors/${author.id}`}
        >
          {author.name_en}
        </Link>
      </li>
    ));
  }

  renderDBAuthors() {
    return _.map(this.props.dbAuthors, author => (
      <li key={author.id}>
        <Link
          onClick={async () => {
            await this.props.countStoryAuthor(author.id);
            await this.props.listStoryAuthor(author.id);
          }}
          className="toggle-item"
          to={`/stories/public/${author.id}`}
        >
          {author.nickname}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <div className="nav-col">
        <div id="nav" className="clearfix" role="navigation">
          <div className="user-wrapper">
            <AuthenticationState />
          </div>
          <ul className="primary-nav">
            <li className="active">
              <Link className="toggle-item" to="/">
Home
              </Link>
            </li>
            <li>
              <Link className="toggle-item" to="/about">
About
              </Link>
            </li>
            <li className="has-children">
              <a>
Editors
              </a>
              <ul>
                {this.renderAuthors()}
              </ul>
            </li>
            <li className="has-children">
              <a>
Stories
              </a>
              <ul>
                {this.renderDBAuthors()}
              </ul>
            </li>
            <li>
              <Link className="toggle-item" to="/notice">
Notice
              </Link>
            </li>
            <li>
              <Link className="toggle-item" to="/board">
Free Board
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    memAuthors: state.author.list, // author 리듀서 스테이트 전체를 authors prop 로 매핑
    dbAuthors: state.author.dbList,
  };
}

export default connect(mapStateToProps, {
  selectAuthor,
  listAuthors,
  countStoryAuthor,
  listStoryAuthor,
})(Navigation);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectAuthor } from '../../reducers/reducer_active_author';

class Navigation extends Component {
  // 필진 리스트 렌더링 함수
  // 리스트를 클릭하면 액션 생성자를 호출해 특정 필진 데이터를 리듀서로 옮긴다
  renderAuthors() {
    return this.props.authors.map((author) => {
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
          <p>
            <a href="#login-modal" data-toggle="modal" className="toggle-login">
              <i className="fa fa-sign-in"/>&nbsp;&nbsp;Login</a>
            <span className="v-divider"/>
            <a href="#signup-modal" data-toggle="modal" className="toggle-signup">
              <i className="fa fa-pencil"/>&nbsp;&nbsp;Sign Up</a>
          </p>
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
    authors: state.authors
  }
}

// 액션 생성자를 리액트 props 에 바인딩
function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectAuthor: selectAuthor}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

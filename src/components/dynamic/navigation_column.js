import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {
  renderAuthors() {
    return this.props.authors.map((author) => {
      return (
      <li key={author.id}>
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

export default connect(mapStateToProps)(Navigation);

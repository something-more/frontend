import React from 'react';
import { Link } from 'react-router-dom';
import AuthorDetail from '../dynamic/author_detail';

export default () => {
  return (
  <div className="nav-col" style={{"border": "none"}}>
    <nav id="nav" className="clearfix" role="navigation">
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
          <a href="#">About</a>
        </li>
        <li className="has-children">
          <a>Editors</a>
          <ul>
            <li><Link to="/authors">Kim Hojang</Link></li>
            <li><a href="#">Han Siwon</a></li>
            <li><a href="#">Seung Hyung Soo</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Stories</a>
        </li>
      </ul>
    </nav>
  </div>
  )
}

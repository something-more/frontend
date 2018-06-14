import React from 'react';

export default () => {
  return (
  <div className="nav-col">
    <nav id="nav" className="clearfix" role="navigation">
      <div className="user-wrapper">
        <p><a href="#login-modal" data-toggle="modal" className="toggle-login">
          <i className="fa fa-sign-in"></i>&nbsp;&nbsp;Login</a> <span className="v-divider"></span>
          <a href="#signup-modal" data-toggle="modal" className="toggle-signup">
            <i className="fa fa-pencil"></i>&nbsp;&nbsp;Sign Up</a></p>
      </div>
      <ul className="primary-nav">
        <li className="active"><a href="/">Home</a></li>
        <li><a href="#">About</a></li>
        <li className="has-children">
          <a href="#">Portfolio</a>
          <ul>
            <li><a href="#">Portfolio Child Link 1</a></li>
            <li><a href="#">Portfolio Child Link 2</a></li>
            <li className="has-children"><a href="#">Portfolio Child w/Child Trigger</a>
              <ul>
                <li><a href="#">Portfolio Grand Child Link 1</a></li>
                <li><a href="#">Portfolio Grand Child Link 2</a></li>
              </ul>
            </li>
            <li><a href="#">Portfolio Child Link 3</a></li>
            <li><a href="#">Portfolio Child Link 4</a></li>
          </ul>
        </li>
        <li className="has-children"><a href="#">Services</a>
          <ul>
            <li><a href="#">Services Child Link 1</a></li>
            <li><a href="#">Services Child Link 2</a></li>
            <li className="has-children"><a href="#">Services Child w/Child Trigger</a>
              <ul>
                <li><a href="#">Services Grand Child Link 1</a></li>
                <li><a href="#">Services Grand Child Link 2</a></li>
              </ul>
            </li>
            <li><a href="#">Services Child Link 3</a></li>
            <li><a href="#">Services Child Link 4</a></li>
          </ul>
        </li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Bootstrap</a></li>
      </ul>
    </nav>
  </div>
  )
}

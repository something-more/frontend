import React from 'react';
import logo from '../../assets/images/logo/text_logo.svg';

export default () => (
  <div className="logo-col">
    <a className="toggle-menu">
      <i className="fa fa-bars" />
    </a>
    <div className="logo-wrapper">
      <a href="/" className="clearfix">
        <img
          id="logo"
          src={logo}
          alt="company name"
        />
      </a>
    </div>
    {/* <div className="search-wrapper"> */}
    {/* <a */}
    {/* className="toggle-search tooltip-hover" */}
    {/* title="search" */}
    {/* data-placement="left" */}
    {/* > */}
    {/* <i className="fa fa-search" /> */}
    {/* </a> */}
    {/* <div className="search-panel"> */}
    {/* <form> */}
    {/* <input */}
    {/* type="search" */}
    {/* placeholder="Enter search term and press enter" */}
    {/* className="form-control" */}
    {/* /> */}
    {/* </form> */}
    {/* </div> */}
    {/* </div> */}
    <div className="social-wrapper">
      <ul>
        <li>
          <a
            href="https://www.facebook.com/%EC%84%AC%EB%9D%B5%EB%AA%A8%EC%96%B4-137267330409505/"
            className="tooltip-hover"
            data-placement="left"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Us on Facebook"
          >
            <i className="fa fa-facebook" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/_somethingmore/"
            className="tooltip-hover"
            data-placement="left"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Us on Instagram"
          >
            <i className="fa fa-instagram" />
          </a>
        </li>
      </ul>
    </div>
  </div>
);

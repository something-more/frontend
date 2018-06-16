import React from 'react';
import logo from '../../assets/images/text_logo.svg';

export default () => {
  return (
  <div className="logo-col" style={{"height": "100vh"}}>
    <a href="#" className="toggle-menu">
      <i className="fa fa-bars"/></a>
    <div className="logo-wrapper">
      <a href="/" className="clearfix">
        <img
        id="logo"
        src={logo}
        alt="company name"/>
      </a>
    </div>
    <div className="search-wrapper">
      <a
      href="#"
      className="toggle-search tooltip-hover"
      title="search"
      data-placement="left">
        <i className="fa fa-search"/>
      </a>
      <div className="search-panel">
        <form role="form">
          <input
          type="search"
          placeholder="Enter search term and press enter"
          className="form-control"/>
        </form>
      </div>
    </div>
    <div className="social-wrapper">
      <ul>
        <li>
          <a
          href="#"
          className="fa fa-facebook tooltip-hover"
          data-placement="left"
          target="_blank"
          title="Follow Us on Facebook"/></li>
        <li>
          <a
          href="https://www.instagram.com/_somethingmore/"
          className="fa fa-instagram tooltip-hover"
          data-placement="left"
          target="_blank"
          title="Follow Us on Instagram"/></li>
      </ul>
    </div>
  </div>
  )
}

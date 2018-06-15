import React from 'react';

export default () => {
  return (<div className="logo-col">
    <a href="#" className="toggle-menu"><i className="fa fa-bars"></i></a>
    <div className="logo-wrapper">
      <a href="#" className="clearfix"> <img id="logo" src="assets/images/logo.png" alt="company name"></img></a>
    </div>
    <div className="search-wrapper">
      <a href="#"
      className="toggle-search tooltip-hover"
      title="search"
      data-placement="left"><i className="fa fa-search"></i></a>
      <div className="search-panel">
        <form role="form">
          <input type="search" placeholder="Enter search term and press enter" className="form-control"/>
        </form>
      </div>
    </div>
    <div className="social-wrapper">
      <ul>
        <li><a href="#"
        className="fa fa-facebook tooltip-hover"
        data-placement="left"
        title="Follow Us on Facebook"></a></li>
        <li><a href="#"
        className="fa fa-instagram tooltip-hover"
        data-placement="left"
        title="Follow Us on Instagram"></a></li>
      </ul>
    </div>
  </div>
  )
}

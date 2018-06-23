import React, { Component } from 'react';

const $ = window.jQuery;

class Stories extends Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = () => {
    $('#myTabs a').click(function (event) {
      event.preventDefault();
      $(this).tab('show');
    });
  };

  render() {
    return (
    <div ref={node => this.node = node}
      className="content-col">
      <div className="inner-content">
        <h1 className="title">Stories</h1>
        <hr className="vertical-spacer"/>
        <button style={{color: "#ec5004"}} className="btn btn-link pull-right">Let's Post</button>
        <ul id="myTabs" className="nav nav-tabs">
          <li className="active"><a href="#">Published</a></li>
          <li><a href="#">Draft</a></li>
        </ul>
      </div>
    </div>
    )
  }
}

export default Stories;

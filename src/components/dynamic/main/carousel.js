import React, { Component } from 'react';

class MainCarousel extends Component {

  renderItem() {
    return (
    <div>hello</div>
    )
  }

  render() {
    return (
    <div className="multi-slider owl-carousel clearfix">
      {this.renderItem()}
    </div>
    )
  }
}

export default MainCarousel;

import React, { Component } from 'react';
import MainCarousel from './carousel';
import Banner from './banner';
import NoticeMiniList from './notice_mini';
import BoardMiniList from './board_mini';

class PostsIndex extends Component {
  render() {
    return (
      <div className="inner-content fadeIn animated">
        {/* carousel */}
        <MainCarousel />
        {/* banner */}
        <Banner />
        {/* 2-row description */}
        <div className="row">
          <NoticeMiniList />
          <BoardMiniList />
        </div>
      </div>
    );
  }
}

export default PostsIndex;

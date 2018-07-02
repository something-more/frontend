import React, { Component } from 'react';
import MainCarousel from './carousel';
import Banner from './banner';
import NoticeMiniList from './notice_mini';
import BoardMiniList from './board_mini';

class PostsIndex extends Component {
  render() {
    return (
      <div className="content-col" id="page">
        <div className="inner-content">
          {/* carousel */}
          <MainCarousel />
          {/* banner */}
          <Banner />
          {/* text description */}
          <div>
            <h2 className="h1 font-weight-thin">
Wrap & Roll sideWaze
            </h2>
            <p className="lead">
              <strong>
Pellentesque habitant morbi tristique
              </strong>
              {' '}
senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget.
            </p>
          </div>
          {/* 2-row description */}
          <div className="row">
            <NoticeMiniList />
            <BoardMiniList />
          </div>
        </div>
      </div>
    );
  }
}

export default PostsIndex;

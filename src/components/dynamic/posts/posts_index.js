import React, { Component } from 'react';

class PostsIndex extends Component {
  render() {
    return (
    <div className="content-col" id="page">
      <div className="inner-content">
        {/*carousel*/}
        <div className="multi-slider owl-carousel clearfix">
          <figure className="item"><img data-src="assets/demo-images/113569013.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a href="http://www.flickr.com/photos/dannypigart/113569013/">Danny PiG</a> via <a href="http://photopin.com">photopin</a>
              <a href="http://creativecommons.org/licenses/by-sa/2.0/">cc</a></figcaption>
          </figure>
          <figure className="item"><img data-src="assets/demo-images/664637664.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a href="http://www.flickr.com/photos/everydaylifemodern/664637664/">observista</a> via <a
            href="http://photopin.com">photopin</a> <a href="http://creativecommons.org/licenses/by-nd/2.0/">cc</a>
            </figcaption>
          </figure>
          <figure className="item"><img data-src="assets/demo-images/1383113606.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a href="http://www.flickr.com/photos/asthmatic/1383113606/">asthmatic</a> via <a href="http://photopin.com">photopin</a>
              <a href="http://creativecommons.org/licenses/by-nd/2.0/">cc</a></figcaption>
          </figure>
          <figure className="item"><img data-src="assets/demo-images/2033195014.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a className="text-underline"
            href="http://www.flickr.com/photos/pagedooley/2033195014/">kevin dooley</a> via <a href="http://photopin.com">photopin</a>
              <a href="http://creativecommons.org/licenses/by/2.0/">cc</a></figcaption>
          </figure>
          <figure className="item"><img data-src="assets/demo-images/2191568652.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a href="http://www.flickr.com/photos/karenhorton/2191568652/">karen horton</a> via <a
            href="http://photopin.com">photopin</a> <a href="http://creativecommons.org/licenses/by/2.0/">cc</a>
            </figcaption>
          </figure>
          <figure className="item"><img data-src="assets/demo-images/3210096256.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a href="http://www.flickr.com/photos/ollieolarte/3210096256/">olarte.ollie</a> via <a
            href="http://photopin.com">photopin</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">cc</a>
            </figcaption>
          </figure>
          <figure className="item"><img data-src="assets/demo-images/4180676190.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a href="http://www.flickr.com/photos/davefayram/4180676190/">DaveFayram</a> via <a href="http://photopin.com">photopin</a>
              <a href="http://creativecommons.org/licenses/by/2.0/">cc</a></figcaption>
          </figure>
          <figure className="item"><img data-src="assets/demo-images/6995883979.jpg"
          src="/"
          alt="Feature 1"
          className="lazyOwl"/>
            <figcaption>credit: <a href="http://www.flickr.com/photos/chrispiascik/6995883979/">Chris Piascik</a> via <a
            href="http://photopin.com">photopin</a> <a href="http://creativecommons.org/licenses/by-nd/2.0/">cc</a>
            </figcaption>
          </figure>
        </div>
        {/*banner*/}
        <div className="banner">
          <h1 className="display-text">
            <span className="line-1">240<em>px</em> & Up</span>
            <span className="line-2">Responsive Wrapper</span>
            <span className="line-3">for Bootstrap 3x Framework</span>
          </h1>
        </div>
        {/*text description*/}
        <div>
          <h2 className="h1 font-weight-thin">Wrap & Roll sideWaze</h2>
          <p className="lead">
            <strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget.
          </p>
        </div>
        {/*2-row description*/}
        <div className="row">
          <div className="col-ms-6 col-sm-6">
            <p>Pellentesque habitant morbi tristiquesenectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a
            href="#"
            className="text-underline">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
          </div>
          <div className="col-ms-6 col-sm-6">
            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo.
            </p>
          </div>
        </div>
        <hr className="vertical-spacer"/>
        {/*3-row description*/}
        <div className="row">
          <div className="col-ms-4 col-sm-4">
            <i className="fa fa-refresh feature-icon"/>
            <h2 className="spaced-out-header h4 uppercase font-weight-bold">Refreshing</h2>
            <p className="med-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</p>
            <p><a className="btn btn-default btn-sm" href="#" role="button">Some Link &raquo;</a></p>
            <hr className="vertical-spacer visible-xs"/>
          </div>
          <div className="col-ms-4 col-sm-4">
            <i className="fa fa-mobile feature-icon"/>
            <i className="fa fa-tablet feature-icon"/>
            <i className="fa fa-desktop feature-icon"/>
            <h2 className="spaced-out-header h4 uppercase font-weight-bold">Responsive</h2>
            <p className="med-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</p>
            <p><a className="btn btn-default btn-sm" href="#" role="button">Some Link &raquo;</a></p>
            <hr className="vertical-spacer visible-xs"/>
          </div>
          <div className="col-ms-4 col-sm-4">
            <i className="fa fa-code feature-icon"/>
            <h2 className="spaced-out-header h4 uppercase font-weight-bold">Clean</h2>
            <p className="med-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</p>
            <p><a className="btn btn-default btn-sm" href="#" role="button">Some Link &raquo;</a></p>
          </div>
        </div>
        <hr className="vertical-spacer"/>
        {/*last description*/}
        <div className="row">
          <div className="col-ms-5 col-sm-4 col-lg-5">
            <figure>
              <img src="" className="img-responsive img-custom" alt=""/>
              <figcaption className="small">credit:
                <a href="http://www.flickr.com/photos/asthmatic/1383113606/">asthmatic</a>
                via
                <a href="http://photopin.com">photopin</a>
                <a href="http://creativecommons.org/licenses/by-nd/2.0/">cc</a>
              </figcaption>
            </figure>
            <hr className="vertical-spacer visible-xs"/>
          </div>
          <div className="col-ms-7 col-sm-8 col-lg-7">
            <h2 className="h3 font-weight-thin no-margin-top">Head in the Game</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>
            <hr/>
            <blockquote>
              <p className="lead">Design is not just what it looks like and feels like. Design is how it works.</p>
              <footer>Steve Jobs</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default PostsIndex;

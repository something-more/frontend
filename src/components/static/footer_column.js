import React from 'react';

export default () => (
  <footer className="footer footer-col clearfix">
    <div className="footer-content-1">
      <div className="inner-content">
        <h5>
Contact Us
        </h5>
        <p className="no-margin-bottom">
          <strong>
phone:
          </strong>
          {' '}
          <a className="text-underline" href="tel:8135551234">
813.555.1234
          </a>
          <br />
          <strong>
fax:
          </strong>
          {' '}
813.555.1235
          <br />
          <span className="overflow">
            <strong>
email:
            </strong>
            {' '}
            <a
              className="text-underline"
              href="mailto:great-ho@somethingmore.co.kr"
            >
great-ho@somethingmore.co.kr
            </a>
          </span>
        </p>
      </div>
    </div>
    <hr className="divider" />
    <div className="footer-content-2">
      <div className="inner-content">
        <h5>
Latest Articles
        </h5>
        <ul className="article-list">
          <li>
            <a href="your-link-goes-here.html">
We will amplify our power to benchmark
            </a>
          </li>
          <li>
            <a href="your-link-goes-here.html">
We have revolutionized the conceptualization of structuring
            </a>
          </li>
          <li>
            <a href="your-link-goes-here.html">
Everything is relative; relatively speaking.
            </a>
          </li>
          <li>
            <a href="your-link-goes-here.html">
My other body is an immortal robot body.
            </a>
          </li>
          <li>
            <a href="your-link-goes-here.html">
I don&apos;t know who they are but they&apos;re right behind you
            </a>
          </li>
          <li>
            <a href="your-link-goes-here.html">
For those about to rock, we salute you
              {' '}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr className="divider" />
    <div className="inner-content copyright">
      <p className="small">
© Copyright 2018 Something More Literature. All rights reserved.
      </p>
    </div>
  </footer>
);

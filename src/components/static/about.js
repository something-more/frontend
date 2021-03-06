import React from 'react';
import { Helmet } from 'react-helmet';
import LogoImg from '../../assets/images/logo/logo_full-min.png';

export default () => (
  <div className="inner-content fadeIn animated" style={{ paddingTop: '100px' }}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>
Something More | About
      </title>
    </Helmet>
    <div className="col-md-6 col-md-offset-3">
      <img
        src={LogoImg}
        className="img-responsive center-block"
        width="400px"
        alt="text-logo"
      />
    </div>
    <div
      className="col-md-10 col-md-offset-1 text-center"
      style={{ padding: '70px 0' }}
    >
      <h4>
&lsquo;섬띵모어&rsquo;의 로고는 당사가 성찰적인 정신을 최고 가치로 삼음을 상징합니다.
      </h4>
    </div>
    <div
      className="col-md-4 col-md-offset-1"
    >
      <p style={{ marginBottom: '0' }}>
원고 투고:
      </p>
      <p>
        <a
          className="text-underline"
          href="mailto:great-ho@somethingmore.co.kr"
        >
            great-ho@somethingmore.co.kr
        </a>
      </p>
    </div>
  </div>
);

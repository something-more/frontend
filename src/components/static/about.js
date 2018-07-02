import React from 'react';
import logoImg from '../../assets/images/logo/img_logo.svg';
import logoText from '../../assets/images/logo/text_logo_horizontal.png';

export default () => (
  <div className="content-col">
    <div
      className="row"
      style={{
        margin: '100px 0',
        padding: '0 10px',
      }}
    >
      <div className="col-md-6 col-md-offset-3">
        <img
          src={logoImg}
          className="img-responsive center-block"
          width="200px"
          alt="img-logo"
        />
        <img
          src={logoText}
          className="img-responsive center-block"
          width="500px"
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
  </div>
);

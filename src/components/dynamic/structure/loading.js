import React from 'react';
import LoadingImg from '../../../assets/images/design/AjaxLoader.gif';

export default () => (
  <div className="center-block">
    <img
      src={LoadingImg}
      style={{ margin: '0 auto' }}
      className="img-responsive"
      alt="loading img"
    />
  </div>
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoImg from '../../../assets/images/logo/logo_full-min.png';
import AlertError from './alert_error';
import LandingPageForms from './landing_page_forms';

class LandingPage extends Component {
  render() {
    const agent = navigator.userAgent.toLowerCase();

    if (!sessionStorage.getItem('display')) {
      return (
        <div id="init-box">
          <div className="aligner">
            <div className="aligner-item text-center fadeIn animated">
              <div style={{ marginBottom: '20px' }}>
                <img
                  src={LogoImg}
                  className="img-responsive center-block"
                  alt="logo-img"
                />
              </div>
              {
                agent.indexOf('trident') !== -1
                ? <div className="alert alert-danger">
                  현재 구형 Internet Explorer를 사용하고 계십니다. 서비스를 원활히 이용하기 위해 신형 브라우저&nbsp;
                  <a className="text-info"
                  href="https://www.google.com/chrome/">Chrome</a>을 이용해주시길 바랍니다.
                </div>
                : null}
              <LandingPageForms />
              <AlertError errors={this.props.error} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

export default connect(mapStateToProps)(LandingPage);

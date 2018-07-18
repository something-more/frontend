import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoImg from '../../../assets/images/logo/logo_full-min.png';
import AlertError from './alert_error';
import LandingPageForms from './landing_page_forms';

class LandingPage extends Component {
  render() {
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

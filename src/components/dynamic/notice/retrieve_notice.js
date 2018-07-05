import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveNotice, destroyNotice } from '../../../reducers/reducer_notice';
import decodeJWT from '../../../include/jwt_decode';
import { onDestroy } from '../../../include/submit_functions';
import Loading from '../structure/loading';

class RetrieveNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: '',
      loading: true,
    };
  }

  async componentDidMount() {
    // Call Ajax
    const { match } = this.props;
    await this.props.retrieveNotice(match.params.id);

    // Set Quill Object
    await this.setState({ quill: new Quill('#editor') });
    const contents = await JSON.parse(this.props.notice.content);
    await this.state.quill.setContents(contents);

    // Render Contents
    await this.setState({ loading: false });

    // Process Img
    document.getElementById('content').innerHTML = this.state.quill.root.innerHTML;
    const images = document.getElementById('content').querySelectorAll('img');
    _.forEach(images, (img) => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }

  render() {
    const { loading } = this.state;
    const { notice, destroyNotice, history } = this.props;

    return (
      <div className="inner-content fadeIn animated">
        <div id="editor" style={{ display: 'none' }} />
        <h1 id="content-title" className="font-weight-thin no-margin-top">
          {notice.title}
        </h1>
        <hr className="hidden-xs" />
        <p className="meta clearfix">
          <span style={{ display: 'inline-block', marginTop: '6px' }}>
            <span>
Author:&nbsp;
              {notice.author}
            </span>
            <span>
&nbsp;/&nbsp;
            </span>
            <span>
Date:&nbsp;
              {moment(notice.date_created).format('YYYY-MM-DD')}
            </span>
          </span>
          {sessionStorage.getItem('token')
          && decodeJWT(sessionStorage.getItem('token')).isAdmin
            ? (
              <span className="pull-right" style={{ display: 'block' }}>
                <button
                  className="btn btn-danger"
                  style={{ marginRight: '10px' }}
                  onClick={() => onDestroy(
                    notice.id, destroyNotice, history.push('/notice'),
                  )}
                >
Delete
                </button>
                <Link
                  to={`/notice/patch/${notice.id}`}
                  type="button"
                  className="btn btn-warning"
                >
Modify
                </Link>
              </span>
            )
            : null}
        </p>
        <hr className="hidden-xs" />
        {!loading
          ? <div id="content" className="ql-editor fadeIn animated" />
          : (
            <div className="aligner">
              <div className="aligner-item">
                <Loading />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notice: state.notice.retrieve,
    error: state.notice.error,
  };
}

export default connect(mapStateToProps, { retrieveNotice, destroyNotice })(RetrieveNotice);

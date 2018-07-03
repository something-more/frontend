import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveNotice, destroyNotice } from '../../../reducers/reducer_notice';
import decodeJWT from '../../../include/jwt_decode';
import { renderQuillObject } from '../../../include/render_quill_object';
import { onDestroy } from '../../../include/submit_functions';

class RetrieveBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: '',
    };
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    await this.props.retrieveNotice(id);
    await renderQuillObject(this.props.notice.content, this.state.quill);
  }

  async componentDidMount() {
    this.setState({
      quill: new Quill('#editor'),
    });
  }

  render() {
    const { notice, destroyNotice, history } = this.props;

    return (
      <div className="content-col">
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
          <div id="content" className="ql-editor" />
        </div>
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

export default connect(mapStateToProps, { retrieveNotice, destroyNotice })(RetrieveBoard);

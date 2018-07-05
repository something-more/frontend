import _ from 'lodash';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveBoard, destroyBoard } from '../../../reducers/reducer_board';
import decodeJWT from '../../../include/jwt_decode';
import { onDestroy } from '../../../include/submit_functions';
import Loading from '../structure/loading';

class RetrieveBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: '',
      loading: true,
    };
  }

  async componentDidMount() {
    // Call Ajax
    const { match, retrieveBoard } = this.props;
    await retrieveBoard(match.params.id);

    // Set Quill Object
    await this.setState({ quill: new Quill('#editor') });
    const contents = await JSON.parse(this.props.board.content);
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
    const { board, destroyBoard, history } = this.props;

    return (
      <div className="inner-content fadeIn animated">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {`Something More | ${board.title}`}
          </title>
        </Helmet>
        <div id="editor" style={{ display: 'none' }} />
        <h1 id="content-title" className="font-weight-thin no-margin-top">
          {board.title}
        </h1>
        <hr className="hidden-xs" />
        <p className="meta clearfix">
          <span style={{ display: 'inline-block', marginTop: '6px' }}>
            <span>
Author:&nbsp;
              {board.author_nickname}
            </span>
            <span>
&nbsp;/&nbsp;
            </span>
            <span>
Date:&nbsp;
              {moment(board.date_created).format('YYYY-MM-DD')}
            </span>
          </span>
          {sessionStorage.getItem('token')
          && decodeJWT(sessionStorage.getItem('token')).id === board.author_id
            ? (
              <span className="pull-right" style={{ display: 'block' }}>
                <button
                  className="btn btn-danger"
                  style={{ marginRight: '10px' }}
                  onClick={() => onDestroy(
                    board.id, destroyBoard, history.push('/board'),
                  )}
                >
Delete
                </button>
                <Link
                  to={`/board/patch/${board.id}`}
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
    board: state.board.retrieve,
    error: state.board.error,
  };
}

export default connect(mapStateToProps, { retrieveBoard, destroyBoard })(RetrieveBoard);

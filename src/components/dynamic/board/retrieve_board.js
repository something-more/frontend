import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveBoard, destroyBoard } from '../../../reducers/reducer_board';
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
    await this.props.retrieveBoard(id);
    await renderQuillObject(this.props.board.content, this.state.quill);
  }

  async componentDidMount() {
    this.setState({
      quill: new Quill('#editor'),
    });
  }

  render() {
    const { board, destroyBoard, history } = this.props;

    return (
      <div className="content-col">
        <div className="inner-content">
          <div id="editor" style={{ display: 'none' }} />
          <h1 className="font-weight-thin no-margin-top">
            {board.title}
          </h1>
          <hr className="hidden-xs" />
          <p className="meta clearfix">
            <span style={{ display: 'inline-block', marginTop: '6px' }}>
              <span>
Author:&nbsp;
                {board.author}
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
          && decodeJWT(sessionStorage.getItem('token')).email === board.author
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
          <div id="content" className="ql-editor" />
        </div>
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

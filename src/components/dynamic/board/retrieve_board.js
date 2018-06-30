import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import moment from 'moment';
import { retrieveBoard, destroyBoard } from '../../../reducers/reducer_board';
import { decodeJWT } from '../../../include/jwt_decode';
import { renderQuillObject } from '../../../include/render_quill_object';

class RetrieveBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: ''
    }
  }

  async componentDidMount() {
    this.setState({
      quill: new Quill('#editor')
    });
    const {id} = this.props.match.params;
    await this.props.retrieveBoard(id);
    await renderQuillObject(this.props.board.content, this.state.quill);
  }

  async onDestroy() {
    const isConfirm = window.confirm('정말 삭제하겠습니까?');

    if (isConfirm) {
      await alert('삭제되었습니다');
      await this.props.destroyBoard(this.props.board.id);
      await this.props.history.push('/board')
    } else {
      alert('삭제를 취소하셨습니다');
    }
  }

  render() {
    const { board } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <div id="editor" style={{display: "none"}}/>
        <h1 className="font-weight-thin no-margin-top">{board.title}</h1>
        <hr className="hidden-xs"/>
        <p className="meta">
          <span>Author: {board.author}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>Date: {moment(board.date_created).format('YYYY-MM-DD')}</span>
          {sessionStorage.getItem('token') &&
          decodeJWT(sessionStorage.getItem('token')).email === board.author
          ? <div className="pull-right">
            <button
            className="btn btn-danger"
            style={{marginRight: "10px"}}
            onClick={() => this.onDestroy()}>Delete</button>
            <Link
          to={`/board/patch/${board.id}`}
          type="button"
          className="btn btn-warning">Modify</Link>
          </div>
          : null}
        </p>
        <hr className="hidden-xs"/>
        <div id="content" className="ql-editor"/>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board.retrieve,
    error: state.board.error
  }
}

export default connect(mapStateToProps, { retrieveBoard, destroyBoard })(RetrieveBoard);

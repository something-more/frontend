import _ from 'lodash';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { listBoard, countBoard } from '../../../reducers/reducer_board';
import decodeJWT from '../../../include/jwt_decode';
import Pagination from '../structure/write_modules/pagination';
import AlertError from '../structure/alert_error';

class ListBoard extends Component {
  async componentWillMount() {
    await this.props.countBoard();
    await this.props.listBoard();
  }

  renderList() {
    return _.map(this.props.boardList, (board) => {
      // 글 생성 일자
      const dateCreated = moment(board.date_created).format('YYYY-MM-DD');

      return (
        <tr key={board.id}>
          <td className="col-md-2">
            {board.author}
          </td>
          <td className="col-md-8">
            <Link to={`/board/${board.id}`}>
              {board.title}
            </Link>
          </td>
          <td className="col-md-2">
            {dateCreated}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="inner-content fadeIn animated">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
Something More | 자유게시판 목록
          </title>
        </Helmet>
        <h1 className="title">
Free Board
        </h1>
        <hr className="vertical-spacer" />
        {sessionStorage.getItem('token') // 토큰이 존재하면서 동시에 expired 되지 않았을 때
          && (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix())
          ? (
            <Link
              to="/board/write"
              type="button"
              style={{ color: '#ec5004' }}
              className="btn btn-link pull-right"
            >
Let's Post
            </Link>
          )
          : null}
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th className="col-md-2 text-center">
글쓴이
              </th>
              <th className="col-md-8 text-center">
제목
              </th>
              <th className="col-md-2 text-center">
날짜
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.boardCount !== 0 ? this.renderList() : null}
          </tbody>
        </table>
        <hr className="vertical-spacer" />
        <div className="center-block text-center">
          <ul className="pagination">
            {this.props.boardCount !== 0
              ? <Pagination count={this.props.boardCount} list={this.props.listBoard} />
              : null}
          </ul>
        </div>
        <AlertError errors={this.props.error} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    boardCount: state.board.count,
    boardList: state.board.list,
    error: state.board.error,
  };
}

export default connect(mapStateToProps, { listBoard, countBoard })(ListBoard);

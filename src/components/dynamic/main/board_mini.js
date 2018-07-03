import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import { countBoard, listBoard } from '../../../reducers/reducer_board';
import AlertError from '../structure/alert_error';

class BoardMiniList extends Component {
  async componentWillMount() {
    await this.props.countBoard();
    await this.props.listBoard('1&limit=4');
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
      <div className="col-ms-6 col-sm-6">
        <h4>
자유게시판
        </h4>
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

export default connect(mapStateToProps, { countBoard, listBoard })(BoardMiniList);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listBoard, countBoard } from '../../../reducers/reducer_board';
import { decodeJWT } from "../../../include/jwt_decode";
import moment from "moment/moment";
import Pagination from '../structure/write_modules/pagination';
import AlertError from '../structure/alert_error';

class ListBoard extends Component {

  async componentWillMount() {
    await this.props.countBoard();
    await this.props.listBoard();
  }

  renderList() {
    return this.props.boardList.map((board) => {
      // 글 생성 일자
      const dateCreated = moment(board.date_created).format('YYYY-MM-DD');

      return (
      <tr key={board.id}>
        <td>{board.author}</td>
        <td><Link to={`/board/${board.id}`}>{board.title}</Link></td>
        <td>{dateCreated}</td>
      </tr>
      )
    })
  }

  render() {
    return (
      <div className="content-col">
        <div className="inner-content">
          <h1 className="title">Free Board</h1>
          <hr className="vertical-spacer"/>
          {sessionStorage.getItem('token') && // 토큰이 존재하면서 동시에 expired 되지 않았을 때
          (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix())
          ? <Link
              to="/board/write"
              type="button"
              style={{color: "#ec5004"}}
              className="btn btn-link pull-right">Let's Post</Link>
          : null}
          <table className="table table-hover text-center">
            <thead>
            <tr>
              <th className="text-center">글쓴이</th>
              <th className="text-center">제목</th>
              <th className="text-center">날짜</th>
            </tr>
            </thead>
            <tbody>
            {this.props.boardCount !== 0 ? this.renderList() : null}
            </tbody>
          </table>
          <hr className="vertical-spacer"/>
          <div className="center-block text-center">
            <ul className="pagination">
              {this.props.boardCount !== 0
              ? <Pagination count={this.props.boardCount} list={this.props.listBoard}/>
              : null}
            </ul>
          </div>
          <AlertError errors={this.props.error}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    boardCount: state.board.count,
    boardList: state.board.list,
    error: state.board.error
  }
}

export default connect(mapStateToProps, { listBoard, countBoard })(ListBoard);

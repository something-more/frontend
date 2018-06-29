import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listNotice, countNotice } from '../../../reducers/reducer_notice';
import { decodeJWT } from '../../../include/jwt_decode';
import moment from 'moment/moment';
import AlertError from '../structure/alert_error';

class ListBoard extends Component {

  async componentDidMount() {
    await this.props.countNotice();
    await this.props.listNotice();
  }

  renderPagination() {
    const { noticeCount } = this.props;
    const pageCount = Math.ceil(noticeCount / 15);
    const pageArray = [];

    for (let step = 1; step <= pageCount; step += 1) {
      pageArray.push(step);
    }

    return pageArray.map((pageNum) => {
      return(
      <li>
        <a onClick={() => this.props.listNotice(`page=${pageNum}`)}>{pageNum}</a>
      </li>
      )
    })

  }

  renderList() {
    return this.props.noticeList.map((notice) => {
      // 글 생성 일자
      const dateCreated = moment(notice.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.noticeList.length) - (this.props.noticeList.indexOf(notice));
      return (
      <tr key={notice.id}>
        <td>{indexNum}</td>
        <td><Link to={`/notice/${notice.id}`}>{notice.title}</Link></td>
        <td>{dateCreated}</td>
      </tr>
      )
    })
  }

  render() {
    return (
    <div className="content-col">
      <div className="inner-content">
        <h1 className="title">Notice</h1>
        <hr className="vertical-spacer"/>
        {sessionStorage.getItem('token') && // 토큰이 존재하면서 동시에 expired 되지 않았을 때
        (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix()) &&
        decodeJWT(sessionStorage.getItem('token')).isAdmin === true
        ? <Link
        to="/notice/write"
        type="button"
        style={{color: "#ec5004"}}
        className="btn btn-link pull-right">Let's Post</Link>
        : null}
        <table className="table table-hover text-center">
          <thead>
          <tr>
            <th className="text-center">번호</th>
            <th className="text-center">제목</th>
            <th className="text-center">날짜</th>
          </tr>
          </thead>
          <tbody>
          {this.props.noticeCount !== 0 ? this.renderList() : null}
          </tbody>
        </table>
        <hr className="vertical-spacer"/>
        <div className="center-block text-center">
          <ul className="pagination">
            {this.props.noticeCount !== 0 ? this.renderPagination() : null}
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
    noticeCount: state.notice.count,
    noticeList: state.notice.list,
    error: state.notice.error
  }
}

export default connect(mapStateToProps, { listNotice, countNotice })(ListBoard);
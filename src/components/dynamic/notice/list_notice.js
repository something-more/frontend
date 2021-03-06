import _ from 'lodash';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { listNotice, countNotice } from '../../../reducers/reducer_notice';
import decodeJWT from '../../../include/jwt_decode';
import Pagination from '../structure/write_modules/pagination';
import AlertError from '../structure/alert_error';

class ListBoard extends Component {
  async componentWillMount() {
    await this.props.countNotice();
    await this.props.listNotice();
  }

  renderList() {
    return _.map(this.props.noticeList, (notice) => {
      // 글 생성 일자
      const dateCreated = moment(notice.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.noticeList.length) - (this.props.noticeList.indexOf(notice));
      return (
        <tr key={notice.id}>
          <td className="col-md-2 text-center">
            {indexNum}
          </td>
          <td className="col-md-8 text-left">
            <Link to={`/notice/${notice.id}`}>
              {notice.title}
            </Link>
          </td>
          <td className="col-md-2 text-center">
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
Something More | 공지사항 목록
          </title>
        </Helmet>
        <h1 className="title">
Notice
        </h1>
        <hr className="vertical-spacer" />
        {sessionStorage.getItem('token') // 토큰이 존재하면서 동시에 expired 되지 않았을 때
        && (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix())
        && decodeJWT(sessionStorage.getItem('token')).isAdmin === true
          ? (
            <Link
              to="/notice/write"
              type="button"
              style={{ color: '#ec5004' }}
              className="btn btn-link pull-right"
            >
Let's Post
            </Link>
          )
          : null}
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-center col-md-2">
번호
              </th>
              <th className="text-left col-md-8">
제목
              </th>
              <th className="text-center col-md-2">
날짜
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.noticeCount !== 0 ? this.renderList() : null}
          </tbody>
        </table>
        <hr className="vertical-spacer" />
        <div className="center-block text-center">
          <ul className="pagination">
            {this.props.noticeCount !== 0
              ? <Pagination count={this.props.noticeCount} list={this.props.listNotice} />
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
    noticeCount: state.notice.count,
    noticeList: state.notice.list,
    error: state.notice.error,
  };
}

export default connect(mapStateToProps, { listNotice, countNotice })(ListBoard);

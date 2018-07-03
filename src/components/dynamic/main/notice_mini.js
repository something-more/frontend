import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import { countNotice, listNotice } from '../../../reducers/reducer_notice';
import AlertError from '../structure/alert_error';
import Loading from '../structure/loading';

class NoticeMiniList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentWillMount() {
    await this.props.countNotice();
    await this.props.listNotice('1&limit=4');
    await this.setState({ loading: false });
  }

  renderList() {
    return _.map(this.props.noticeList, (notice) => {
      // 글 생성 일자
      const dateCreated = moment(notice.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.noticeList.length) - (this.props.noticeList.indexOf(notice));
      return (
        <tr key={notice.id}>
          <td className="col-md-2">
            {indexNum}
          </td>
          <td className="col-md-7">
            <Link to={`/notice/${notice.id}`}>
              {notice.title}
            </Link>
          </td>
          <td className="col-md-3">
            {dateCreated}
          </td>
        </tr>
      );
    });
  }

  render() {
    const { loading } = this.state;
    if (!loading) {
      return (
        <div className="col-ms-6 col-sm-6">
          <h4>
          공지사항
          </h4>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th className="text-center col-md-2">
              번호
                </th>
                <th className="text-center col-md-7">
              제목
                </th>
                <th className="text-center col-md-3">
              날짜
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.noticeCount !== 0 ? this.renderList() : null}
            </tbody>
          </table>
          <AlertError />
        </div>
      );
    }
    return (
      <div className="col-ms-6 col-sm-6">
        <h4>
        공지사항
        </h4>
        <Loading />
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

export default connect(mapStateToProps, { countNotice, listNotice })(NoticeMiniList);

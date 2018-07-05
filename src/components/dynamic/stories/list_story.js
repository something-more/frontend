import _ from 'lodash';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import propTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { countStory, listStory, changePublishStory } from '../../../reducers/reducer_story';
import Pagination from '../structure/write_modules/pagination';
import AlertError from '../structure/alert_error';

class ListStory extends Component {

  static propTypes = {
    countStory: propTypes.func.isRequired,
    listStory: propTypes.func.isRequired,
  };

  async componentWillMount() {
    await this.props.countStory();
    await this.props.listStory();
  }

  async onChangePublish(story) {
    let bool = [];
    story.is_published ? bool = ['false', '발행 중'] : bool = ['true', '미발행'];
    const isConfirm = window.confirm(`현재 이 글의 상태는 ${bool[1]}입니다. 변경하시겠습니까?`);

    if (isConfirm) {
      const formData = new FormData();
      formData.append('data_modified', moment().format());
      formData.append('is_published', bool[0]);
      await this.props.changePublishStory(formData, story.id);
    }

    if (!this.props.error) {
      alert('변경되었습니다');
      await window.location.reload();
    }
  }

  renderList() {
    return _.map(this.props.storyList, (story) => {
      // 글 생성 일자
      const dateCreated = moment(story.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.storyList.length) - (_.indexOf(this.props.storyList, story));
      return (
        <tr key={story.id}>
          <td className="col-md-2">
            {indexNum}
          </td>
          <td className="col-md-6">
            {story.is_published
              ? (
                <Link to={`/stories/${story.id}`}>
                  {story.title}
                </Link>
              )
              : (
                <Link to={`/me/stories/${story.id}`}>
                  {story.title}
                </Link>
              )}
          </td>
          <td className="col-md-2">
            {dateCreated}
          </td>
          <td className="col-md-2">
            {story.is_published
              ? (
                <button
                  onClick={() => this.onChangePublish(story)}
                  className="btn btn-success btn-sm"
                >
발행 중
                </button>
              )
              : (
                <button
                  onClick={() => this.onChangePublish(story)}
                  className="btn btn-default btn-sm"
                >
미발행
                </button>
              )}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
        <div ref={node => this.node = node}
        className="inner-content fadeIn animated">
          <Helmet>
            <meta charSet="utf-8"/>
            <title>Something More | 스토리 목록</title>
          </Helmet>
          <h1 className="title">
Stories
          </h1>
          <hr className="vertical-spacer" />
          <Link
            to="/me/write"
            type="button"
            style={{ color: '#ec5004' }}
            className="btn btn-link pull-right"
          >
Let's Post
          </Link>
          <hr className="vertical-spacer" />
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th className="text-center col-md-2">
번호
                </th>
                <th className="text-center col-md-6">
제목
                </th>
                <th className="text-center col-md-2">
날짜
                </th>
                <th className="text-center col-md-2">
발행 여부
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.storyCount !== 0 ? this.renderList() : null}
            </tbody>
          </table>
          <div className="center-block text-center">
            <ul className="pagination">
              {this.props.storyCount !== 0
                ? <Pagination count={this.props.storyCount} list={this.props.listStory} />
                : null }
            </ul>
          </div>
          <AlertError errors={this.props.error} />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    storyCount: state.story.count,
    storyList: state.story.list,
    error: state.story.error,
  };
}

export default connect(mapStateToProps, { countStory, listStory, changePublishStory })(ListStory);

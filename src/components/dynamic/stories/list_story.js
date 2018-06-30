import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { countStory, listStory } from '../../../reducers/reducer_story';

class ListStory extends Component {

  async componentWillMount() {
    await this.props.countStory();
    await this.props.listStory();
  }

  renderList() {
    return _.map(this.props.storyList, story => {
      // 글 생성 일자
      const dateCreated = moment(story.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.storyList.length) - (_.indexOf(this.props.storyList, story));
      return (
      <tr key={story.id}>
        <td className="col-md-2">{indexNum}</td>
        <td className="col-md-6">
          {story.is_published
          ? <Link
            to={`/stories/${story.id}`}>
            {story.title}
          </Link>
          : <Link
            to={`/me/stories/${story.id}`}>
            {story.title}
          </Link>}
        </td>
        <td className="col-md-2">{dateCreated}</td>
        <td className="col-md-2">
          {story.is_published
          ? <button className="btn btn-success btn-sm">발행 중</button>
          : <button className="btn btn-default btn-sm">미발행</button>}
        </td>
      </tr>
      )
    })
  }

  render() {
    return (
    <div ref={node => this.node = node}
      className="content-col">
      <div className="inner-content">
        <h1 className="title">Stories</h1>
        <hr className="vertical-spacer"/>
        <Link
          to="/me/write"
          type="button"
          style={{color: "#ec5004"}}
          className="btn btn-link pull-right">Let's Post</Link>
        <hr className="vertical-spacer"/>
        <table className="table table-hover text-center">
          <thead>
          <tr>
            <th className="text-center col-md-2">번호</th>
            <th className="text-center col-md-6">제목</th>
            <th className="text-center col-md-2">날짜</th>
            <th className="text-center col-md-2">발행 여부</th>
          </tr>
          </thead>
          <tbody>
            {this.props.storyCount !== 0 ? this.renderList() : null}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    storyCount: state.story.count,
    storyList: state.story.list,
    error: state.story.error
  }
}

export default connect(mapStateToProps, { countStory, listStory })(ListStory);

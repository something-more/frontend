import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import _ from 'lodash';
import { listStoryAuthor, countStoryAuthor } from '../../../reducers/reducer_author';
import Pagination from '../structure/write_modules/pagination';
import AlertError from '../structure/alert_error';

class AuthorStoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
    };
  }

  async componentDidMount() {
    const { match, listStoryAuthor, countStoryAuthor } = this.props;
    await countStoryAuthor(match.params.id);
    await listStoryAuthor(match.params.id);

    const storyObject = await _.last(this.props.storyList);
    await this.setState({ nickname: storyObject.author_nickname });
  }

  renderList() {
    return _.map(this.props.storyList, (story) => {
      // 글 생성 일자
      const dateCreated = moment(story.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.storyList.length) - (this.props.storyList.indexOf(story));
      return (
        <tr key={story.id}>
          <td className="col-md-2">
            {indexNum}
          </td>
          <td className="col-md-8">
            <Link to={`/stories/${story.id}`}>
              {story.title}
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
            {`Something More | ${this.state.nickname}`}
          </title>
        </Helmet>
        <h1 className="title">
          {this.state.nickname}
's stories
        </h1>
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th className="text-center col-md-2">
              번호
              </th>
              <th className="text-center col-md-8">
              제목
              </th>
              <th className="text-center col-md-2">
              날짜
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.storyCount !== 0 ? this.renderList() : null}
          </tbody>
        </table>
        <hr className="vertical-spacer" />
        <div className="center-block text-center">
          <ul className="pagination">
            {this.props.boardCount !== 0
              ? <Pagination count={this.props.storyCount} list={this.props.listStoryAuthor} />
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
    storyList: state.author.storyList,
    storyCount: state.author.count,
    error: state.author.error,
  };
}

export default connect(mapStateToProps, { listStoryAuthor, countStoryAuthor })(AuthorStoryList);

import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  listStory,
  filterPublished,
  filterDraft } from '../../../reducers/reducer_story';

const $ = window.jQuery;

class ListStory extends Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  async componentDidMount() {
    await this.props.listStory();
    await this.props.filterDraft();
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = () => {
    $('#myTabs a').click(function (event) {
      event.preventDefault();
      $(this).tab('show');
    });
  };

  renderList() {
    return this.props.filteredList.map(story => {
      // 글 생성 일자
      const dateCreated = moment(story.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.filteredList.length) - (this.props.filteredList.indexOf(story));
      return (
      <tr key={story.id}>
        <td>{indexNum}</td>
        <td>
          <Link
            to={`/me/stories/${story.id}`}>
              {story.title}
          </Link>
        </td>
        <td>{dateCreated}</td>
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
        <ul id="myTabs" className="nav nav-tabs">
          <li><a onClick={() => this.props.filterPublished()}>Published</a></li>
          <li className="active"><a onClick={() => this.props.filterDraft()}>Draft</a></li>
        </ul>
        <hr className="vertical-spacer"/>
        <table className="table table-hover text-center">
          <thead>
          <tr>
            <th className="text-center">번호</th>
            <th className="text-center">제목</th>
            <th className="text-center">날짜</th>
          </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filteredList: state.story.filteredList,
    error: state.story.error
  }
}

export default connect(mapStateToProps, {
  listStory,
  filterPublished,
  filterDraft })(ListStory);

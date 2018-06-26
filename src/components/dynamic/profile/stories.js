import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listStory } from '../../../reducers/reducer_story';

const $ = window.jQuery;

class Stories extends Component {
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
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
    return this.props.list.map(story => {
      // 글 생성 일자
      const dateCreated = moment(story.date_created).format('YYYY-MM-DD');
      // 글 인덱스 번호
      const indexNum = (this.props.list.length) - (this.props.list.indexOf(story));
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
          <li className="active"><a href="#">Published</a></li>
          <li><a onClick={() => this.props.listStory()}>Draft</a></li>
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
    list: state.story.list,
    error: state.story.error
  }
}

export default connect(mapStateToProps, { listStory })(Stories);

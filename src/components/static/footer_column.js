import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clientListStory } from '../../reducers/reducer_story';

class FooterColumn extends Component {
  async componentWillMount() {
    await this.props.clientListStory();
  }

  renderList() {
    return _.map(this.props.storyList, story => (
      <li key={story.id}>
        <Link to={`/stories/${story.id}`}>
          {story.title}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <footer className="footer footer-col clearfix">
        <div className="footer-content-1">
          <div className="inner-content">
            <h5>
            Contact Us
            </h5>
            <p className="no-margin-bottom">
              <strong>
              phone:&nbsp;
              </strong>
              <a className="text-underline" href="tel:01022242834">
              010-2224-2834
              </a>
              <br />
              <span className="overflow">
                <strong>
                  email:&nbsp;
                </strong>
                <a
                  className="text-underline"
                  href="mailto:great-ho@somethingmore.co.kr"
                >
great-ho@somethingmore.co.kr
                </a>
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
        <div className="footer-content-2">
          <div className="inner-content">
            <h5>
            Latest Articles
            </h5>
            <ul className="article-list">
              {this.renderList()}
            </ul>
          </div>
        </div>
        <hr className="divider" />
        <div className="inner-content copyright">
          <p className="small">
          © Copyright 2018 Something More Literature. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    storyList: state.story.clientList,
    error: state.story.error,
  };
}

export default connect(mapStateToProps, { clientListStory })(FooterColumn);

import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clientListStory } from '../../../reducers/reducer_story';
import AlertError from '../structure/alert_error';

class MainCarousel extends Component {
  async componentWillMount() {
    await this.props.clientListStory();
  }

  renderItem() {
    const CSS = {
      border: '1px solid #ddd',
      borderRadius: '4px',
      textAlign: 'center',
    };

    return _.map(this.props.storyList, story => (
      <div
        className="col-sm-3 col-ms-3"
        key={story.id}
      >
        <div style={CSS}>
          <Link to={`/stories/${story.id}`} className="text-muted">
            <figure>
              <img src="" alt="thumbnail" />
              <figcaption>
                <span>
                  {story.title}
                </span>
                <span>
&nbsp;|&nbsp;
                </span>
                <span>
                  {story.author}
                </span>
              </figcaption>
            </figure>
          </Link>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          {this.renderItem()}
        </div>
        <AlertError errors={this.props.error} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    storyList: state.story.list,
    error: state.story.error,
  };
}

export default connect(mapStateToProps, { clientListStory })(MainCarousel);

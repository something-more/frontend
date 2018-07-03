import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clientListStory } from '../../../reducers/reducer_story';
import AlertError from '../structure/alert_error';
import Loading from '../structure/loading';
import defaultImg from '../../../assets/images/logo/img_logo.svg';

class MainCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentWillMount() {
    await this.props.clientListStory();
    await this.setState({ loading: false });
  }

  renderItem() {
    const CSS = {
      border: '1px solid #ddd',
      borderRadius: '8px',
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
              {story.thumbnail
                ? (
                  <img
                    src={story.thumbnail}
                    style={{ borderRadius: '8px 8px 0 0' }}
                    className="img-responsive"
                    alt="thumbnail"
                  />
                )
                : (
                  <img
                    src={defaultImg}
                    style={{ opacity: '.3' }}
                    className="img-responsive"
                    alt="default-thumbnail"
                  />
                )}
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
    const { loading } = this.state;
    if (!loading) {
      return (
        <Fragment>
          <div className="row">
            {this.renderItem()}
          </div>
          <AlertError errors={this.props.error} />
        </Fragment>
      );
    }
    return (
      <Loading />
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

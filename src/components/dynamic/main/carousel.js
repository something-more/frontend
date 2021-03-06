import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clientListStory } from '../../../reducers/reducer_story';
import AlertError from '../structure/alert_error';
import Loading from '../structure/loading';
import defaultImg from '../../../assets/images/logo/logo_full-min.png';

class MainCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await this.props.clientListStory();
    await this.setState({ loading: false });
    const imgArray = await document.querySelectorAll('img.story-thumbnail');
    await _.forEach(imgArray, (img) => {
      Number(img.width) > Number(img.height)
        ? img.classList.add('thumbnail-wide-img')
        : img.style.width = '100%';
    });
  }

  renderItem() {
    const CSS = {
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '16px',
    };

    return _.map(this.props.storyList, story => (
      <div
        className="col-sm-3 col-ms-6"
        key={story.id}
      >
        <div style={CSS}>
          <Link to={`/stories/${story.id}`} className="text-muted">
            <figure>
              <div
                className="thumbnail-grid"
                style={{
                  borderRadius: '8px 8px 0 0',
                  overflow: 'hidden',
                }}
              >
                <div className="thumbnail-grid-content">
                  {story.thumbnail
                    ? (
                      <img
                        className="story-thumbnail"
                        src={story.thumbnail}
                        alt="thumbnail"
                      />
                    )
                    : (
                      <img
                        src={defaultImg}
                        style={{ opacity: '.3', maxWidth: '90%', padding: '45px 10px', height: 'auto' }}
                        alt="default-thumbnail"
                      />
                    )}
                </div>
              </div>
              <figcaption
                className="center-block"
                style={{ maxWidth: '90%' }}
              >
                <p style={{
                  margin: '6px 0',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                >
                  <strong>
                    {story.author_nickname}
                  </strong>
&nbsp;|&nbsp;
                  {story.title}
                </p>
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
    storyList: state.story.clientList,
    error: state.story.error,
  };
}

export default connect(mapStateToProps, { clientListStory })(MainCarousel);

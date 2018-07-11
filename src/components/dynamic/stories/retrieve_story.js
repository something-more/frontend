import _ from 'lodash';
import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveStory, destroyStory } from '../../../reducers/reducer_story';
import decodeJWT from '../../../include/jwt_decode';
import { onDestroy } from '../../../include/submit_functions';
import Loading from '../structure/loading';

class RetrieveStory extends Component {

  static propTypes = {
    retrieveStory: PropTypes.func.isRequired,
    story: PropTypes.shape().isRequired,
    content: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      quill: '',
      loading: true,
    };
  }

  async componentDidMount() {
    // Call Ajax
    const { match, retrieveStory } = this.props;
    await retrieveStory(match.params.id);

    // Set Quill Object
    await this.setState({ quill: new Quill('#editor') });
    const contents = await JSON.parse(this.props.story.content);
    await this.state.quill.setContents(contents);

    // Render Contents
    await this.setState({ loading: false });

    // Process Img
    document.getElementById('content').innerHTML = this.state.quill.root.innerHTML;
    const images = document.getElementById('content').querySelectorAll('img');
    _.forEach(images, (img) => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }

  render() {
    const {loading} = this.state;
    const {story, history} = this.props;

    return (
    <div className="inner-content fadeIn animated">
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{`Something More | ${story.title}`}</title>
      </Helmet>
      <div id="editor" style={{display: 'none'}}/>
      <h1 id="content-title" className="font-weight-thin no-margin-top">
        {story.title}
      </h1>
      <hr className="hidden-xs"/>
      <p className="meta clearfix">
            <span style={{display: "inline-block", marginTop: "6px"}}>
              <span>
Author:&nbsp;
                {story.author_nickname}
            </span>
            <span>
&nbsp;/&nbsp;
            </span>
            <span>
Date:&nbsp;
              {moment(story.date_created).format('YYYY-MM-DD')}
            </span>
            </span>
        <span className="pull-right" style={{display: 'block'}}>
          <Link
          type="button"
          className="btn btn-success"
          style={{marginRight: '10px'}}
          to={`/stories/public/${story.author_id}`}
          >
  List
</Link>
          {sessionStorage.getItem('token')
        && decodeJWT(sessionStorage.getItem('token')).id === story.author_id ? (
        <Fragment>
          <button
          type="button"
          className="btn btn-danger"
          style={{marginRight: '10px'}}
          onClick={() => onDestroy(story.id, destroyStory, history.push('/me/stories'),)}
          >
            Delete
          </button>
          <Link
          to={`/me/stories/${story.id}`}
          type="button"
          className="btn btn-warning"
          >
            Modify
          </Link>
        </Fragment>
                ) : null}
                </span>
      </p>
      <hr className="hidden-xs"/>
      {!loading
      ? <Fragment>
        {story.thumbnail
        ? <Fragment>
          <img className="img-responsive" src={story.thumbnail} alt="story thumbnail"/>
          <hr className="vertical-spacer"/>
        </Fragment>
        : null}
        <div id="content" className="ql-editor fadeIn animated"/>
      </Fragment>
      : <div className="aligner">
        <div className="aligner-item">
          <Loading />
        </div>
      </div>
      }
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    story: state.story.retrieve,
    error: state.story.error,
  };
}

export default connect(mapStateToProps, { retrieveStory, destroyStory })(RetrieveStory);

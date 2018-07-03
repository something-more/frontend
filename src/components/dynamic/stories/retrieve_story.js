import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveStory, destroyStory } from '../../../reducers/reducer_story';
import { renderQuillObject } from '../../../include/render_quill_object';
import decodeJWT from '../../../include/jwt_decode';
import { onDestroy } from '../../../include/submit_functions';

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
    };
  }

  async componentWillMount() {
    const { match } = this.props;
    await this.props.retrieveStory(match.params.id);
    await renderQuillObject(this.props.story.content, this.state.quill);
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor'),
    });
  }

  render() {
    const { story, history } = this.props;
    return (
      <div className="content-col">
        <div className="inner-content">
          <div id="editor" style={{ display: 'none' }} />
          <h1 className="font-weight-thin no-margin-top">
            {story.title}
          </h1>
          <hr className="hidden-xs" />
          <p className="meta clearfix">
            <span style={{display: "inline-block", marginTop: "6px"}}>
              <span>
Author:&nbsp;
                {story.author}
            </span>
            <span>
&nbsp;/&nbsp;
            </span>
            <span>
Date:&nbsp;
              {moment(story.date_created).format('YYYY-MM-DD')}
            </span>
            </span>
            {sessionStorage.getItem('token')
          && decodeJWT(sessionStorage.getItem('token')).id === story.author
              ? (
                <span className="pull-right" style={{ display: 'block' }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginRight: '10px' }}
                    onClick={() => onDestroy(
                      story.id, destroyStory, history.push('/me/stories'),
                    )}
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
                </span>
              )
              : null}
          </p>
          <hr className="hidden-xs" />
          <div id="content" className="ql-editor" />
        </div>
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

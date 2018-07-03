import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveStory, patchStory, destroyStory } from '../../../reducers/reducer_story';
import { renderQuillPatchObject } from '../../../include/render_quill_object';
import QuillOptions from '../structure/write_modules/quill_options';
import AlertError from '../structure/alert_error';
import { onDestroy } from '../../../include/submit_functions';

class PatchStory extends Component {

  static propTypes = {
    retrieveStory: PropTypes.func.isRequired,
    story: PropTypes.shape().isRequired,
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
    await renderQuillPatchObject(this.props, this.props.story, this.state.quill);
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor', QuillOptions),
    });
  }

  async onPublish(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());
    formData.append('is_published', 'true');

    await this.props.patchStory(formData, this.props.story.id);

    if (!this.props.error) {
      await this.props.history.push('/me/stories');
    }
  }

  async onDraftSave(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());
    formData.append('is_published', 'false');

    await this.props.patchStory(formData, this.props.story.id);

    if (!this.props.error) {
      await window.location.reload();
    }
  }

  render() {
    const {
      handleSubmit, story, destroyStory, history,
    } = this.props;

    return (
      <div className="content-col">
        <div className="inner-content fadeIn animated">
          <h1 className="title">
Complete Your Stories...
          </h1>
          <p className="meta">
            <span>
Created Date:
              {moment(story.date_created).format('YYYY-MM-DD')}
            </span>
          </p>
          <form
            method="post"
            encType="multipart/form-data"
          >
            <div
              className="input-group"
              style={{ marginBottom: '20px' }}
            >
              <Field
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                component="input"
                required
              />
              <div className="input-group-btn">
                <button
                  type="button"
                  className="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
Action
                  {' '}
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li>
                    <a onClick={handleSubmit(this.onPublish.bind(this))}>
Publish
                    </a>
                  </li>
                  <li>
                    <a onClick={handleSubmit(this.onDraftSave.bind(this))}>
Draft Save
                    </a>
                  </li>
                  <li role="separator" className="divider" />
                  <li>
                    <a onClick={() => onDestroy(story.id, destroyStory, history.push('/me/stories'))
                }
                    >
                      <span className="text-danger">
Destroy
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="editor" style={{ minHeight: '70vh' }} />
          </form>
          <AlertError errors={this.props.error} />
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

export default reduxForm({
  form: 'PatchStoryForm',
})(
  connect(mapStateToProps, { retrieveStory, patchStory, destroyStory })(PatchStory),
);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveStory, patchStory, destroyStory } from '../../../reducers/reducer_story';
import renderQuillPatchObject from '../../../include/render_quill_object';
import QuillOptions from '../structure/write_modules/quill_options';
import AlertError from '../structure/alert_error';
import { onDestroy } from '../../../include/submit_functions';

class PatchStory extends Component {

  static propTypes = {
    retrieveStory: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      quill: '',
      file: '',
      imagePreviewUrl: '',
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

  handleFileUpload(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  async onPublish(values) {
    const { quill, file } = this.state;
    const delta = JSON.stringify(quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());
    formData.append('is_published', 'true');

    if(file) {
      formData.append('thumbnail', file);
    }

    await this.props.patchStory(formData, this.props.story.id);

    if (!this.props.error) {
      await this.props.history.push('/me/stories');
    }
  }

  async onDraftSave(values) {
    const { quill, file } = this.state;
    const delta = JSON.stringify(quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());
    formData.append('is_published', 'false');
    if (file) {
      formData.append('thumbnail', file);
    }

    await this.props.patchStory(formData, this.props.story.id);

    if (!this.props.error) {
      await window.location.reload();
    }
  }

  render() {
    const { imagePreviewUrl } = this.state;
    const {
      handleSubmit, story, destroyStory, history,
    } = this.props;

    return (
        <div className="inner-content fadeIn animated">
          <Helmet>
            <meta charSet="utf-8"/>
            <title>Something More | 스토리 수정</title>
          </Helmet>
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
            <div className="row" style={{marginBottom: "20px"}}>
              <div className="col-sm-4 col-ms-4">
                <div className="form-group">
                  <label htmlFor="thumbnailInput">
                    썸네일 선택
                  </label>
                  <input
                  id="thumbnailInput"
                  name="thumbnail"
                  type="file"
                  onChange={this.handleFileUpload.bind(this)}
                  />
                </div>
              </div>
              <div className="col-sm-4 col-ms-4">
                {imagePreviewUrl
                ? (
                <img
                alt="story thumbnail"
                src={imagePreviewUrl}
                className="img-responsive center-block"
                style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '20px' }}
                />
                )
                : (
                <div
                className="alert alert-info center-block text-center"
                style={{ maxWidth: '300px' }}
                >
                  썸네일 이미지를 선택해주세요
                </div>
                )}
              </div>
              <div className="col-sm-4 col-ms-4">
                <h6><strong>기존 썸네일</strong></h6>
                {story.thumbnail
                ? <img src={story.thumbnail} className="img-responsive" alt="default thumbnail" />
                : <p className="text-center">없음</p>}
              </div>
            </div>
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
Action&nbsp;
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

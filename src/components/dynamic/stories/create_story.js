import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { createStory } from '../../../reducers/reducer_story';
import { onCreate } from '../../../include/submit_functions';
import QuillOptions from '../structure/write_modules/quill_options';
import { TitleField } from '../structure/input_fields';
import AlertError from '../structure/alert_error';

class CreateStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: '',
      file: '',
      imagePreviewUrl: '',
    };
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

  async onSubmit(values) {
    const { quill, file } = this.state;
    const { createStory } = this.props;
    await onCreate(quill, values, createStory, file);

    if (!this.props.error) {
      await window.location.replace('/me/stories');
    }
  }

  render() {
    const { imagePreviewUrl } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div className="inner-content fadeIn animated">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
Something More | 스토리 쓰기
          </title>
        </Helmet>
        <h1 className="title">
Write Your Story...
        </h1>
        <hr className="vertical-spacer" />
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <div className="row">
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
            <div className="col-sm-8 col-ms-8">
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
          </div>
          <div className="row" style={{ marginBottom: '20px' }}>
            <div className="col-sm-4 col-ms-4">
              <Field name="category" className="form-control" id="category" component="select">
                <option value="" disabled selected>
                  글머리 선택
                </option>
                <option value="novel">
                  소설
                </option>
                <option value="essay">
                  산문
                </option>
                <option value="think">
                  단상
                </option>
                <option value="comment">
                  작가의 말
                </option>
              </Field>
            </div>
          </div>
          <Field name="title" label="save" component={TitleField} />
          <div id="editor" style={{ minHeight: '70vh' }} />
        </form>
        <AlertError errors={this.props.error} />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.category) {
    errors.category = '글머리를 선택하셔야 합니다';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    error: state.story.error,
  };
}

export default reduxForm({
  validate,
  form: 'CreateStoryForm',
})(
  connect(mapStateToProps, { createStory })(CreateStory),
);

import React, { Component } from 'react';
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
      imagePreviewUrl: ''
    };
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor', QuillOptions),
    });
  }

  handleFileUpload(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    };

    reader.readAsDataURL(file);
  }

  async onSubmit(values) {
    const { quill, file } = this.state;
    const { createStory, error, history } = this.props;
    await onCreate(quill, values, createStory, error, history.push('/me/stories'), file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div className="content-col">
        <div className="inner-content">
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
                  <label htmlFor="thumbnailInput">썸네일 선택</label>
                  <input
                  id="thumbnailInput"
                  name="thumbnail"
                  type="file"
                  onChange={this.handleFileUpload.bind(this)}/>
                </div>
              </div>
              <div className="col-sm-8 col-ms-8">
                {imagePreviewUrl
                ? <img
                  alt="story thumbnail"
                  src={imagePreviewUrl} className="img-responsive center-block"
                  style={{maxWidth: "200px", maxHeight: "200px", marginBottom: "20px"}}/>
                : <div className="alert alert-info center-block text-center"
                style={{maxWidth:"300px"}}>썸네일 이미지를 선택해주세요</div>}
              </div>
            </div>
            <Field name="title" label="save" component={TitleField} />
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
    error: state.story.error,
  };
}

export default reduxForm({
  form: 'CreateStoryForm',
})(
  connect(mapStateToProps, { createStory })(CreateStory),
);

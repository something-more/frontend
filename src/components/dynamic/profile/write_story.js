import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { createStory } from '../../../reducers/reducer_story';

class WriteStory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quill: '',
      options: {
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['image', 'video', 'link'],
          ],
        },
        placeholder: 'Tell your story...',
        theme: 'snow',
      }
    }
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor', this.state.options)
    })
  }

  async onSubmit(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);

    await this.props.createStory(formData);

    if (!this.props.error) {
      await this.props.history.push('/me/stories')
    }
  }

  errorAlert() {
    // 에러가 발견되면 경고창 띄움
    if (this.props.error) {
      return (
      <div className="alert alert-danger">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <strong>{this.props.error}</strong>
      </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <h1 className="title">Write Your Story...</h1>
        <hr className="vertical-spacer"/>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div
          className="input-group"
          style={{marginBottom: "20px"}}>
            <Field
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              component="input"/>
            <span className="input-group-btn">
            <button type="submit" className="btn btn-info pull-right">Save</button>
          </span>
          </div>
          <div id="editor" style={{minHeight: "70vh"}}/>
        </form>
        {this.errorAlert()}
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.story.error
  }
}

export default reduxForm({
  form: 'WriteStoryForm'
})(
  connect(mapStateToProps, { createStory })(WriteStory)
);

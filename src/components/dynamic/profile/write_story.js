import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

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

  onSubmit(values) {
    const delta = JSON.stringify(this.state.quill.getContents());
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <h1 className="title">Write Your Story...</h1>
        <hr className="vertical-spacer"/>
        <form method="post" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
      </div>
    </div>
    )
  }
}

export default reduxForm({
  form: 'WriteStoryForm'
})(
  connect()(WriteStory)
);

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
    };
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor', QuillOptions),
    });
  }

  async onSubmit(values) {
    const { quill } = this.state;
    const { createStory, error, history } = this.props;
    await onCreate(quill, values, createStory, error, history.push('/me/stories'));
  }

  render() {
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

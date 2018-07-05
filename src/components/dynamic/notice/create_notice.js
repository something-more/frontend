import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { createNotice } from '../../../reducers/reducer_notice';
import { TitleField } from '../structure/input_fields';
import { onCreate } from '../../../include/submit_functions';
import QuillOptions from '../structure/write_modules/quill_options';
import AlertError from '../structure/alert_error';

class CreateNotice extends Component {
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
    const { createNotice, error } = this.props;
    await onCreate(quill, values, createNotice);

    if (!error) {
      await window.location.replace('/notice');
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="inner-content fadeIn animated">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
Something More | 공지사항 글쓰기
          </title>
        </Helmet>
        <h1 className="title">
Write Your Notice...
        </h1>
        <hr className="vertical-spacer" />
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <Field name="title" label="publish" component={TitleField} />
          <div id="editor" style={{ minHeight: '70vh' }} />
        </form>
        <AlertError errors={this.props.error} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.notice.error,
  };
}

export default reduxForm({
  form: 'CreateNoticeForm',
})(
  connect(mapStateToProps, { createNotice })(CreateNotice),
);

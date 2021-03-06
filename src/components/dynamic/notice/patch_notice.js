import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveNotice, patchNotice, destroyNotice } from '../../../reducers/reducer_notice';
import renderQuillPatchObject from '../../../include/render_quill_object';
import { TitleField } from '../structure/input_fields';
import { onPatch } from '../../../include/submit_functions';
import QuillOptions from '../structure/write_modules/quill_options';
import AlertError from '../structure/alert_error';

class PatchBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: '',
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.retrieveNotice(id);
    await this.setState({ quill: new Quill('#editor', QuillOptions) });
    await renderQuillPatchObject(this.props, this.props.notice, this.state.quill);
  }

  async onPublish(values) {
    const { quill } = this.state;
    const { notice, patchNotice, error } = this.props;
    await onPatch(notice.id, quill, values, patchNotice);

    if (!error) {
      await window.location.replace(`/notice/${notice.id}`);
    }
  }

  render() {
    const { handleSubmit, notice } = this.props;

    return (
      <div className="inner-content fadeIn animated">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
Something More | 공지사항 글 수정
          </title>
        </Helmet>
        <h1 className="title">
Complete Your Notice...
        </h1>
        <p className="meta">
          <span>
Created Date:
            {moment(notice.date_created).format('YYYY-MM-DD')}
          </span>
        </p>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(this.onPublish.bind(this))}
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
    notice: state.notice.retrieve,
    error: state.notice.error,
  };
}

export default reduxForm({
  form: 'PatchNoticeForm',
})(
  connect(mapStateToProps, { retrieveNotice, patchNotice, destroyNotice })(PatchBoard),
);

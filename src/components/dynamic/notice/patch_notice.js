import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import moment from 'moment';
import { retrieveNotice, patchNotice, destroyNotice } from '../../../reducers/reducer_notice';
import { TitleField } from '../structure/input_fields';
import QuillOptions from '../structure/write_modules/quill_options';
import AlertError from '../structure/alert_error';

class PatchBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: ''
    }
  }

  async componentDidMount() {
    this.setState({
      quill: new Quill('#editor', QuillOptions)
    });

    const {id} = this.props.match.params;
    await this.props.retrieveNotice(id);
    const contents = await JSON.parse(this.props.notice.content);
    await this.state.quill.setContents(contents);
    this.props.initialize({title: this.props.notice.title})
  }

  async onPublish(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());

    await this.props.patchNotice(formData, this.props.notice.id);

    if (!this.props.error) {
      await this.props.history.push(`/notice/${this.props.notice.id}`)
    }
  }

  render() {
    const { handleSubmit, notice } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <h1 className="title">Complete Your Notice...</h1>
        <p className="meta">
          <span>Created Date: {moment(notice.date_created).format('YYYY-MM-DD')}</span>
        </p>
        <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit(this.onPublish.bind(this))}>
          <Field name="title" component={TitleField}/>
          <div id="editor" style={{minHeight: "70vh"}}/>
        </form>
        <AlertError errors={this.props.error}/>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    notice: state.notice.retrieve,
    error: state.notice.error
  }
}

export default reduxForm({
  form: 'PatchNoticeForm'
})(
connect(mapStateToProps, { retrieveNotice, patchNotice, destroyNotice })(PatchBoard)
);

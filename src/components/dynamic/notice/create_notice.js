import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { createNotice } from '../../../reducers/reducer_notice';
import AlertError from '../structure/alert_error';

class CreateNotice extends Component {

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
    formData.append('date_created', moment().format());

    await this.props.createNotice(formData);

    if (!this.props.error) {
      await this.props.history.push('/notice')
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <h1 className="title">Write Your Notice...</h1>
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
            component="input"
            required/>
            <span className="input-group-btn">
            <button type="submit" className="btn btn-info pull-right">Publish</button>
          </span>
          </div>
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
    error: state.notice.error
  }
}

export default reduxForm({
  form: 'CreateNoticeForm'
})(
  connect(mapStateToProps, { createNotice })(CreateNotice)
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import moment from 'moment';
import { retrieveNotice, patchNotice, destroyNotice } from '../../../reducers/reducer_notice';
import AlertError from '../structure/alert_error';

class PatchBoard extends Component {
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

  async componentDidMount() {
    this.setState({
      quill: new Quill('#editor', this.state.options)
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

  async onDestroy() {
    const isConfirm = window.confirm('정말 삭제하겠습니까?');

    if (isConfirm) {
      await alert('삭제되었습니다');
      await this.props.destroyNotice(this.props.notice.id);
      await this.props.history.push('/notice')
    } else {
      alert('삭제를 취소하셨습니다');
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
        encType="multipart/form-data">
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
            <div className="input-group-btn">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span className="caret"/></button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a onClick={handleSubmit(this.onPublish.bind(this))}>Publish</a></li>
                <li role="separator" className="divider"/>
                <li><a onClick={handleSubmit(this.onDestroy.bind(this))}>
                  <span className="text-danger">Destroy</span></a></li>
              </ul>
            </div>
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
    notice: state.notice.retrieve,
    error: state.notice.error
  }
}

export default reduxForm({
  form: 'PatchNoticeForm'
})(
connect(mapStateToProps, { retrieveNotice, patchNotice, destroyNotice })(PatchBoard)
);

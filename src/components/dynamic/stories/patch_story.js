import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import moment from 'moment';
import { retrieveStory, patchStory, destroyStory } from '../../../reducers/reducer_story';

class PatchStory extends Component {
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
    await this.props.retrieveStory(id);
    const contents = await JSON.parse(this.props.story.content);
    await this.state.quill.setContents(contents);
    this.props.initialize({title: this.props.story.title})
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

  async onPublish(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());
    formData.append('is_published', 'true');

    await this.props.patchStory(formData, this.props.story.id);

    if (!this.props.error) {
      await this.props.history.push('/me/stories')
    }
  }

  async onDraftSave(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());
    formData.append('is_published', 'false');

    await this.props.patchStory(formData, this.props.story.id);

    if (!this.props.error) {
      await window.location.reload();
    }
  }

  async onDestroy() {
    const isConfirm = window.confirm('정말 삭제하겠습니까?');

    if (isConfirm) {
      await alert('삭제되었습니다');
      await this.props.destroyStory(this.props.story.id);
      await this.props.history.push('/me/stories')
    } else {
      alert('삭제를 취소하셨습니다');
    }
  }

  render() {
    const { handleSubmit, story } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <h1 className="title">Complete Your Stories...</h1>
        <p className="meta">
          <span>Created Date: {moment(story.date_created).format('YYYY-MM-DD')}</span>
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
                <li><a onClick={handleSubmit(this.onDraftSave.bind(this))}>Draft Save</a></li>
                <li role="separator" className="divider"/>
                <li><a onClick={handleSubmit(this.onDestroy.bind(this))}>
                  <span className="text-danger">Destroy</span></a></li>
              </ul>
            </div>
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
    story: state.story.retrieve,
    error: state.story.error
  }
}

export default reduxForm({
  form: 'PatchStoryForm'
})(
  connect(mapStateToProps, { retrieveStory, patchStory, destroyStory })(PatchStory)
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import moment from 'moment';
import { retrieveBoard, patchBoard, destroyBoard } from '../../../reducers/reducer_board';
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
    await this.props.retrieveBoard(id);
    const contents = await JSON.parse(this.props.board.content);
    await this.state.quill.setContents(contents);
    this.props.initialize({title: this.props.board.title})
  }

  async onPublish(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_modified', moment().format());

    await this.props.patchBoard(formData, this.props.board.id);

    if (!this.props.error) {
      await this.props.history.push(`/board/${this.props.board.id}`)
    }
  }

  async onDestroy() {
    const isConfirm = window.confirm('정말 삭제하겠습니까?');

    if (isConfirm) {
      await alert('삭제되었습니다');
      await this.props.destroyBoard(this.props.board.id);
      await this.props.history.push('/board')
    } else {
      alert('삭제를 취소하셨습니다');
    }
  }

  render() {
    const { handleSubmit, board } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <h1 className="title">Complete Your Comments...</h1>
        <p className="meta">
          <span>Created Date: {moment(board.date_created).format('YYYY-MM-DD')}</span>
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
    board: state.board.retrieve,
    error: state.board.error
  }
}

export default reduxForm({
  form: 'PatchBoardForm'
})(
connect(mapStateToProps, { retrieveBoard, patchBoard, destroyBoard })(PatchBoard)
);

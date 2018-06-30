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
        encType="multipart/form-data"
        onSubmit={handleSubmit(this.onPublish.bind(this))}>
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
    board: state.board.retrieve,
    error: state.board.error
  }
}

export default reduxForm({
  form: 'PatchBoardForm'
})(
connect(mapStateToProps, { retrieveBoard, patchBoard, destroyBoard })(PatchBoard)
);

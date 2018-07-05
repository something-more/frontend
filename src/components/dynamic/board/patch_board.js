import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import moment from 'moment';
import { retrieveBoard, patchBoard, destroyBoard } from '../../../reducers/reducer_board';
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

  async componentWillMount() {
    const { id } = this.props.match.params;
    await this.props.retrieveBoard(id);
    await renderQuillPatchObject(this.props, this.props.board, this.state.quill);
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor', QuillOptions),
    });
  }

  async onPublish(values) {
    const { quill } = this.state;
    const {
      board, patchBoard, error, history,
    } = this.props;
    await onPatch(board.id, quill, values,
      patchBoard, error, history.push(`/board/${board.id}`));
  }

  render() {
    const { handleSubmit, board } = this.props;

    return (
      <div className="inner-content fadeIn animated">
        <h1 className="title">
Complete Your Comments...
        </h1>
        <p className="meta">
          <span>
Created Date:
            {moment(board.date_created).format('YYYY-MM-DD')}
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
    board: state.board.retrieve,
    error: state.board.error,
  };
}

export default reduxForm({
  form: 'PatchBoardForm',
})(
  connect(mapStateToProps, { retrieveBoard, patchBoard, destroyBoard })(PatchBoard),
);

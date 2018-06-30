import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { createBoard } from '../../../reducers/reducer_board';
import QuillOptions from '../structure/write_modules/quill_options';
import AlertError from '../structure/alert_error';

class CreateBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quill: ''
    }
  }

  componentDidMount() {
    this.setState({
      quill: new Quill('#editor', QuillOptions)
    })
  }

  async onSubmit(values) {
    const delta = JSON.stringify(this.state.quill.getContents());

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', delta);
    formData.append('date_created', moment().format());

    await this.props.createBoard(formData);

    if (!this.props.error) {
      await this.props.history.push('/board')
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="content-col">
        <div className="inner-content">
          <h1 className="title">Write Your Comment...</h1>
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
    error: state.board.error
  }
}

export default reduxForm({
  form: 'CreateBoardForm'
})(
  connect(mapStateToProps, { createBoard })(CreateBoard)
);

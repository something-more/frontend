import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import moment from 'moment';
import { retrieveStory, destroyStory } from '../../../reducers/reducer_story';
import { renderQuillObject } from '../../../include/render_quill_object';
import {decodeJWT} from "../../../include/jwt_decode";
import {onDestroy} from "../../../include/submit_functions";

class RetrieveStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill: ''
    }
  }

  async componentDidMount() {
    this.setState({
      quill: new Quill('#editor')
    });
    const {id} = this.props.match.params;
    await this.props.retrieveStory(id);
    await renderQuillObject(this.props.story.content, this.state.quill);
  }

  render() {
    const { story, destroyStory, history } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <div id="editor" style={{display: "none"}}/>
        <h1 className="font-weight-thin no-margin-top">{story.title}</h1>
        <hr className="hidden-xs"/>
        <p className="meta">
          <span>Author: {story.author}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>Date: {moment(story.date_created).format('YYYY-MM-DD')}</span>
          {sessionStorage.getItem('token') &&
          decodeJWT(sessionStorage.getItem('token')).id === story.author
          ? <div className="pull-right">
            <button
            className="btn btn-danger"
            style={{marginRight: "10px"}}
            onClick={() =>
            onDestroy(story.id, destroyStory, history.push('/me/stories'))}>Delete</button>
            <Link
            to={`/me/stories/${story.id}`}
            type="button"
            className="btn btn-warning">Modify</Link>
          </div>
          : null}
        </p>
        <hr className="hidden-xs"/>
        <div id="content" className="ql-editor"/>
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

export default connect(mapStateToProps, { retrieveStory, destroyStory })(RetrieveStory);

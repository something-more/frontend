import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quill from 'quill';
import moment from 'moment';
import { retrieveStory } from '../../../reducers/reducer_story';
import { renderQuillObject } from '../../../include/render_quill_object';

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
    const { story } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <div id="editor" style={{display: "none"}}/>
        <h1 className="font-weight-thin no-margin-top">{story.title}</h1>
        <hr className="hidden-xs"/>
        <p className="meta">
          <span>Date: {moment(story.date_created).format('YYYY-MM-DD')}</span>
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

export default connect(mapStateToProps, { retrieveStory })(RetrieveStory);

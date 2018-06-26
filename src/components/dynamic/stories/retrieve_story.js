import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quill from 'quill';
import { retrieveStory } from '../../../reducers/reducer_story';

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
    const contents = await JSON.parse(this.props.story.content);
    await this.state.quill.setContents(contents);
    document.getElementById('content').innerHTML = this.state.quill.root.innerHTML;
    const images = document.getElementById('content').querySelectorAll('img')

    images.forEach(img => img.classList.add('img-responsive'))
  }

  render() {
    const { story } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <div id="editor" style={{display: "none"}}/>
        <h1>{story.title}</h1>
        <div id="content"/>
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

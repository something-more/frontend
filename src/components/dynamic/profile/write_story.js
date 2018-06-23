import React, { Component } from 'react';
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

class WriteStory extends Component {

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

  render() {
    return (
      <div className="content-col">
        <div className="inner-content">
          <h1 className="title">Write Your Story...</h1>
          <hr className="vertical-spacer"/>
          <button className="btn btn-info pull-right">Save</button>
          <hr className="vertical-spacer"/>
          <div id="editor" style={{minHeight: "70vh"}}/>
        </div>
      </div>
    )
  }
}

export default WriteStory;

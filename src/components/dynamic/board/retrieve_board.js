import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quill from 'quill';
import moment from 'moment';
import { retrieveBoard } from '../../../reducers/reducer_board';

class RetrieveBoard extends Component {
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
    await this.props.retrieveBoard(id);
    const contents = await JSON.parse(this.props.board.content);
    await this.state.quill.setContents(contents);
    document.getElementById('content').innerHTML = this.state.quill.root.innerHTML;
    const images = document.getElementById('content').querySelectorAll('img');
    images.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    })
  }

  render() {
    const { board } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <div id="editor" style={{display: "none"}}/>
        <h1 className="font-weight-thin no-margin-top">{board.title}</h1>
        <hr className="hidden-xs"/>
        <p className="meta">
          <span>Author: {board.author}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>Date: {moment(board.date_created).format('YYYY-MM-DD')}</span>
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
    board: state.board.retrieve,
    error: state.board.error
  }
}

export default connect(mapStateToProps, { retrieveBoard })(RetrieveBoard);

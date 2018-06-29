import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import moment from 'moment';
import { retrieveNotice, destroyNotice } from '../../../reducers/reducer_notice';
import { decodeJWT } from '../../../include/jwt_decode';

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
    await this.props.retrieveNotice(id);
    const contents = await JSON.parse(this.props.notice.content);
    await this.state.quill.setContents(contents);
    document.getElementById('content').innerHTML = this.state.quill.root.innerHTML;
    const images = document.getElementById('content').querySelectorAll('img');
    images.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    })
  }

  async onDestroy() {
    const isConfirm = window.confirm('정말 삭제하겠습니까?');

    if (isConfirm) {
      await alert('삭제되었습니다');
      await this.props.destroyNotice(this.props.notice.id);
      await this.props.history.push('/notice')
    } else {
      alert('삭제를 취소하셨습니다');
    }
  }

  render() {
    const { notice } = this.props;

    return (
    <div className="content-col">
      <div className="inner-content">
        <div id="editor" style={{display: "none"}}/>
        <h1 className="font-weight-thin no-margin-top">{notice.title}</h1>
        <hr className="hidden-xs"/>
        <p className="meta">
          <span>Date: {moment(notice.date_created).format('YYYY-MM-DD')}</span>
          {sessionStorage.getItem('token') &&
          decodeJWT(sessionStorage.getItem('token')).isAdmin
          ? <div className="pull-right">
            <button
            className="btn btn-danger"
            style={{marginRight: "10px"}}
            onClick={() => this.onDestroy()}>Delete</button>
            <Link
            to={`/notice/patch/${notice.id}`}
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
    notice: state.notice.retrieve,
    error: state.notice.error
  }
}

export default connect(mapStateToProps, { retrieveNotice, destroyNotice })(RetrieveBoard);
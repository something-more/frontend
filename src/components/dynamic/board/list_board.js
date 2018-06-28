import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {decodeJWT} from "../../../include/jwt_decode";
import moment from "moment/moment";

class ListBoard extends Component {

  renderList() {
    return (
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
    )
  }

  render() {
    return (
      <div className="content-col">
        <div className="inner-content">
          <h1 className="title">Free Board</h1>
          <hr className="vertical-spacer"/>
          {sessionStorage.getItem('token') && // 토큰이 존재하면서 동시에 expired 되지 않았을 때
          (decodeJWT(sessionStorage.getItem('token')).exp > moment(new Date().getTime()).unix())
          ? <Link
              to="/board/write"
              type="button"
              style={{color: "#ec5004"}}
              className="btn btn-link pull-right">Let's Post</Link>
          : null}
          <table className="table table-hover text-center">
            <thead>
            <tr>
              <th className="text-center">글쓴이</th>
              <th className="text-center">제목</th>
              <th className="text-center">날짜</th>
            </tr>
            </thead>
            <tbody>
            {this.renderList()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ListBoard;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAuthor } from '../../reducers/reducer_active_author';

class AuthorDetail extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.selectAuthor(id);
  }

  render() {
    return (
    <div className="content-col">
      <p>이름: {this.props.author.name_ko}</p>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    author: state.authors[this.props.match.params.id -1]
  };
}

export default connect(mapStateToProps, {selectAuthor})(AuthorDetail);

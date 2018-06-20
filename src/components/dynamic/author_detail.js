import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAuthor } from '../../reducers/reducer_active_author';

class AuthorDetail extends Component {

  render() {
    const { author } = this.props;

    return (
    <div className="content-col">
      <p>이름: {author.name_ko}</p>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    author: state.activeAuthor
  }
}

export default connect(mapStateToProps, {selectAuthor})(AuthorDetail);


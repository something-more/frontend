import React, { Component } from 'react';
import { connect } from 'react-redux';
import quotation_left from '../../../assets/images/design/quotation_left.png';
import quotation_right from '../../../assets/images/design/quotation_right.png';

class AuthorDetail extends Component {
  render() {
    // author 프로퍼티 설정
    const { author } = this.props;
    const mailto = `mailto:${author.email}`;

    return (
      <div className="content-col">
        <div className="inner-content" style={{marginTop: "100px"}}>
          <div className="col-md-6 col-md-offset-3 text-center">
            <img
              src={author.thumbnail}
              className="img-responsive img-circle center-block"
              width="100px"
              alt="author-thumbnail"
            />
            <h2>
              {author.name_ko}
            </h2>
          </div>
          <div
            className="col-md-10 col-md-offset-1 text-center"
            style={{ padding: '40px 0' }}
          >
            <div className="media">
              <img
                src={quotation_left}
                className="media-object img-responsive pull-left"
                width="50px"
                alt="quotation-left"
              />
            </div>
            <h4 style={{ padding: '20px 0' }}>
              <em>
                {author.introduce}
              </em>
            </h4>
            <div className="media">
              <img
                src={quotation_right}
                className="media-object img-responsive pull-right"
                width="50px"
                alt="quotation-right"
              />
            </div>
          </div>
          <div className="col-md-4 col-md-offset-8 text-right">
            <p style={{ marginBottom: '0' }}>
연락처:
            </p>
            <a
              href={mailto}
              className="text-underline"
            >
              {author.email}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    author: state.author.selected, // author.selected 스테이트만 props 에 매핑
  };
}

export default connect(mapStateToProps)(AuthorDetail);

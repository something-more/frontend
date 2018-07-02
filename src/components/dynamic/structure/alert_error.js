import React from 'react';

export default (props) => {
  // 에러가 발견되면 경고창 띄움
  if (props.errors) {
    return (
      <div className="alert alert-danger">
        <strong>
          {props.errors}
        </strong>
      </div>
    );
  }

  return null;
};

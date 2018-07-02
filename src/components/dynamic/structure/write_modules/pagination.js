import React from 'react';
import _ from 'lodash';

export default ({count, list}) => {
  const pageCount = Math.ceil(count / 15);
  const pageArray = _.range(1, pageCount + 1); // 1에서 페이지 숫자까지 해당하는 배열 생성

  return _.map(pageArray, (pageNum) => {
    return (
    <li key={pageNum}>
      <a onClick={() => list(pageNum)}>{pageNum}</a>
    </li>
    )
  })
}

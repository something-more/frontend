import hyung_soo from '../assets/images/thumbnail/hyung_soo_thumb-min.jpg';

// Actions
const SELECT = 'something-more/authors/SELECT';

// Action Creators
export function selectAuthor(id) {
  return {
    type: SELECT,
    payload: id
  };
}

// Initial state
// list 와 selected 를 분리해서, reducer 가 state 를 변경시키도
// navigation column 이 렌더링할 필진 목록을 잃지 않도록 지켜준다
const initialState = {
  list: [
  {
    id: 1,
    name_ko: '김호장',
    name_en: 'Kim Hojang',
    thumbnail: '',
    introduce: '',
    email: 'great-ho@somethingmore.co.kr'
  }, {
    id: 2,
    name_ko: '한시원',
    name_en: 'Han Siwon',
    thumbnail: '',
    introduce: '',
    email: ''
  }, {
    id: 3,
    name_ko: '승형수',
    name_en: 'Seung Hyung Soo',
    thumbnail: hyung_soo,
    introduce: '컴퓨터의 말과 인간의 말을 함께 배워갑니다.',
    email: 'huskyhoochu@somethingmore.co.kr'
  }],
  selected: {}
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return reducerSelectAuthor(state, action);

    default:
      return state
  }
}

// Reducer function
function reducerSelectAuthor(state, action) {
  const id = action.payload;
  return {
    ...state, // 전개 연산자, 기존 state 를 함께 가지고 온다
    selected: state.list[id -1] // selected 값만 새로 매핑
  }
}

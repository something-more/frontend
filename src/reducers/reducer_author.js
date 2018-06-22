import hyung_soo from '../assets/images/thumbnail/hyung_soo_thumb-min.jpg';

// Actions
const LOAD = 'something-more/authors/LOAD';
const SELECT = 'something-more/authors/SELECT';

// Action Creators
export function fetchAuthors() {
  return {
    type: LOAD
  }
}

export function selectAuthor(id) {
  return {
    type: SELECT,
    payload: id
  };
}

// Initial state
const initialState = [
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
  }
];

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return reducerFetchAuthors(state);

    case SELECT:
      return reducerSelectAuthor(state, action);

    default:
      return state
  }
}

// Reducer function
function reducerFetchAuthors(state) {
  return state
}

function reducerSelectAuthor(state, action) {
  const id = action.payload;
  return state[id - 1]
}

import axios from 'axios';
import axiosConfig from '../include/axios';
import hyungSoo from '../assets/images/thumbnail/hyung_soo_thumb-min.jpg';

// Axios 설정
axiosConfig(axios);

// Actions
const SELECT = 'something-more/authors/SELECT';
const DBLIST = 'something-more/authors/DBLIST';
const STORYLIST = 'something-more/authors/STORYLIST';
const STORYCOUNT = 'something-more/authors/STORYCOUNT';

// Action Creators
// 필진 소개
export function selectAuthor(id) {
  return {
    type: SELECT,
    payload: id,
  };
}

// DB 에서 받아오는 필진 리스트
export async function listAuthors() {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: '/authors/',
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: DBLIST,
    response,
    error,
  };
}

// 특정 작가의 스토리 리스트 (발행된 것만)
export async function listStoryAuthor(id, query = 1) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/authors/${id}?page=${query}`,
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: STORYLIST,
    response,
    error,
  };
}

export async function countStoryAuthor(id) {
  let response = '';
  let error = '';

  try {
    response = await axios({
      method: 'get',
      url: `/authors/count/${id}`,
    });
  } catch (e) {
    error = e.message;
  }

  return {
    type: STORYCOUNT,
    response,
    error,
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
      name_en: 'Kim Ho Jang',
      thumbnail: '',
      introduce: '',
      email: 'great-ho@somethingmore.co.kr',
    }, {
      id: 2,
      name_ko: '승형수',
      name_en: 'Seung Hyung Soo',
      thumbnail: hyungSoo,
      introduce: '컴퓨터의 말과 인간의 말을 함께 배워갑니다.',
      email: 'huskyhoochu@somethingmore.co.kr',
    }],
  dbList: [],
  storyList: [],
  retrieve: {},
  selected: {},
  error: '',
  count: 0,
};

// Reducer function
function reducerSelectAuthor(state, action) {
  const id = action.payload;
  return {
    ...state, // 전개 연산자, 기존 state 를 함께 가지고 온다
    selected: state.list[id - 1], // selected 값만 새로 매핑
  };
}

function reducerListAuthors(state, action) {
  if (action.response) {
    return {
      ...state,
      dbList: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    dbList: [],
    error: action.error,
  };
}

function reducerListStoryAuthor(state, action) {
  if (action.response) {
    return {
      ...state,
      storyList: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    storyList: [],
    error: action.error,
  };
}

function reducerCountStoryAuthor(state, action) {
  if (action.response) {
    return {
      ...state,
      count: action.response.data,
      error: '',
    };
  }
  return {
    ...state,
    count: 0,
    error: action.error,
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return reducerSelectAuthor(state, action);

    case DBLIST:
      return reducerListAuthors(state, action);

    case STORYLIST:
      return reducerListStoryAuthor(state, action);

    case STORYCOUNT:
      return reducerCountStoryAuthor(state, action);

    default:
      return state;
  }
}

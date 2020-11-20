import * as postService from '../services/posts';
import axios from 'axios'
export default {
  namespace: 'posts',
  state: {
    list: [],
    total: null,
    page: null,
    error: '',
    successMsg: ''
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    postError(state, { payload: { error } }) {
      return { ...state, error: error };
    },
    setMessage(state, { payload: { successMsg } }) {
      return { ...state, error: '', successMsg: successMsg };
    },
    hideMessages(state) {
      return { ...state, error: '', successMsg: '' }
    }

  },
  effects: {
    *list({ payload: { page = 1 } }, { call, put }) {
      try {
        const { data, headers } = yield call(postService.fetch, { page });
        yield put({
          type: 'save',
          payload: {
            data,
            total: parseInt(headers['x-total-count'], 10),
            page: parseInt(page, 10),
          },
        });
      }
      catch (e) {
        const errorMsg = errorResponse(e);
        yield put({
          type: 'postError',
          payload: {
            error: errorMsg
          },
        });
      }


      const { data, headers } = yield call(postService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      try {
        yield call(postService.remove, id);
        yield put({ type: 'reload' });
      }
      catch (e) {
        const errorMsg = errorResponse(e);
        yield put({
          type: 'postError',
          payload: {
            error: errorMsg
          },
        });
      }

    },

    *hideMessage({ }, { put }) {
      yield put({ type: 'hideMessages' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      try {
        const updatedPost = yield call(postService.patch, id, values);
        yield put({
          type: 'setMessage',
          payload: {
            successMsg: 'Post has been updated successfully.'
          },
        });
        yield put({ type: 'reload' });
      }
      catch (e) {
        const errorMsg = errorResponse(e);
        yield put({
          type: 'postError',
          payload: {
            error: errorMsg
          },
        });
      }
    },
    *create({ payload: values }, { call, put }) {
      try {
        const createdPost = yield call(postService.create, values);
        yield put({
          type: 'setMessage',
          payload: {
            successMsg: 'Post has been created successfully.'
          },
        });
        yield put({ type: 'reload' });
      }
      catch (e) {
        const errorMsg = errorResponse(e);
        yield put({
          type: 'postError',
          payload: {
            error: errorMsg
          },
        });
      }

    },
    *getById({ payload: values }, { call, put }) {
      yield call(postService.getById, values);
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.posts.page);
      yield put({ type: 'list', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/posts') {
          dispatch({ type: 'list', payload: query });
        }
      });
    },
  },
};


function errorResponse(err) {
  console.log(err, '++++')
  const errorRes = err.response;
  let errorMsg;
  if (errorRes.status === 404) {
    errorMsg = "Not Found"
  }
  else {
    const errInfo = err?.response?.data
    errorMsg = errInfo?.message ? errInfo?.message : errInfo?.error?.message;
  }
  return errorMsg;
}
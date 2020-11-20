import * as postService from '../services/posts';

export default {
  namespace: 'posts',
  state: {
    list: [],
    total: null,
    page: null,
    error:''
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *list({ payload: { page = 1 } }, { call, put }) {
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
      yield call(postService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(postService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(postService.create, values);
      yield put({ type: 'reload' });
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
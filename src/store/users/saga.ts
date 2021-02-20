import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { loadUserApi, loadUsersApi } from '../../lib/api/user';
import { actions, types } from './action';

function* loadUser({ id }: ReturnType<typeof actions.loadUserRequest>) {
  try {
    const { data } = yield call(loadUserApi, id);
    yield put(actions.loadUserSuccess(data));
  } catch (e) {
    yield put(actions.loadUserFailure(e.response?.data));
  }
}

function* watchLoadUser() {
  yield takeLatest(types.LOAD_USER_REQUEST, loadUser);
}

function* loadUsers() {
  try {
    const { data } = yield call(loadUsersApi);
    yield put(actions.loadUsersSuccess(data));
  } catch (e) {
    yield put(actions.loadUsersFailure(e.response?.data));
  }
}

function* watchLoadUsers() {
  yield takeLatest(types.LOAD_USERS_REQUEST, loadUsers);
}

export default function* () {
  yield all([fork(watchLoadUser), fork(watchLoadUsers)]);
}

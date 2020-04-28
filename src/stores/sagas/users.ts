import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import { loadUserApi, loadUsersApi } from '../../apis/user';
import {
  loadUserAction,
  loadUserSuccess,
  loadUserFailure,
  loadUsersSuccess,
  loadUsersFailure,
} from '../actions/users';

function* loadUser({ id }: loadUserAction) {
  try {
    const { data } = yield call(loadUserApi, id);
    yield put(loadUserSuccess(data));
  } catch (e) {
    yield put(loadUserFailure(e.response?.message));
  }
}

function* watchLoadUser() {
  yield takeLatest(types.LOAD_USER_REQUEST, loadUser);
}

function* loadUsers() {
  try {
    const { data } = yield call(loadUsersApi);
    yield put(loadUsersSuccess(data));
  } catch (e) {
    yield put(loadUsersFailure(e.response?.message));
  }
}

function* watchLoadUsers() {
  yield takeLatest(types.LOAD_USERS_REQUEST, loadUsers);
}

export default function* () {
  yield all([fork(watchLoadUser), fork(watchLoadUsers)]);
}
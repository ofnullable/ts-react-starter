import { all, fork } from 'redux-saga/effects';

import users from './users/saga';

export default function* () {
  yield all([fork(users)]);
}

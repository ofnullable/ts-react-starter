import { combineReducers } from 'redux';

import users from './users';

export interface BaseState<T> {
  data: T | null,
  loading: boolean,
  error: string | object
}

export interface BaseArrayState<T> {
  data: T[] | null,
  loading: boolean,
  error: string | object
}

export interface AppState {
  users: ReturnType<typeof users>
}

export default combineReducers({ users });

import { combineReducers } from 'redux';

import users from './users/reducer';

export interface AppState {
  users: ReturnType<typeof users>;
}

export default combineReducers({ users });

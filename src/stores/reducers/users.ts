import produce from 'immer';
import { User } from '../models';
import { BaseArrayState, BaseState } from './index';
import * as types from '../actions/types';
import { UserAction } from '../actions/users';

interface UserState {
  user: BaseState<User>,
  users: BaseArrayState<User>,
}

const initialState: UserState = {
  user: {
    data: null,
    loading: false,
    error: '',
  },
  users: {
    data: null,
    loading: false,
    error: '',
  },
};

export default (state: UserState = initialState, action: UserAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOAD_USERS_REQUEST:
        draft.users.loading = true;
        draft.users.data = null;
        draft.users.error = '';
        break;
      case types.LOAD_USERS_SUCCESS:
        draft.users.data = action.data;
        draft.users.loading = false;
        break;
      case types.LOAD_USERS_FAILURE:
        draft.users.error = action.error;
        draft.users.loading = false;
        break;
      default:
        break;
    }
  });
}

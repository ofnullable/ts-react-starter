import { produce } from 'immer';
import { IUser } from '../models';
import { BaseArrayState, BaseState } from './index';
import * as types from '../actions/types';
import { UserAction } from '../actions/users';

interface UserState {
  user: BaseState<IUser>,
  users: BaseArrayState<IUser>,
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

export default (state: UserState = initialState, action: UserAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_USER_REQUEST:
        draft.user.loading = true;
        draft.user.data = null;
        draft.user.error = '';
        break;
      case types.LOAD_USER_SUCCESS:
        draft.user.data = action.data;
        draft.user.loading = false;
        break;
      case types.LOAD_USER_FAILURE:
        draft.user.error = action.error;
        draft.user.loading = false;
        break;
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

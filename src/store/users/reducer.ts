import { produce } from 'immer';
import { types, UserAction } from './action';
import { User } from '../../lib/interfaces/models';

interface UserState {
  user: BaseState<User>;
  users: BaseState<User[]>;
}

const initialState: UserState = {
  user: {
    data: null,
    loading: false,
    error: null,
  },
  users: {
    data: null,
    loading: false,
    error: null,
  },
};

export default (state: UserState = initialState, action: UserAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_USER_REQUEST:
        draft.user.loading = true;
        draft.user.data = null;
        draft.user.error = null;
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
        draft.users.error = null;
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

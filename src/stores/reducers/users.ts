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

export default (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case types.LOAD_USER_REQUEST:
      return {
        ...state,
        user: {
          loading: true,
          data: null,
          error: '',
        },
      };
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          data: action.data,
        },
      };
    case types.LOAD_USER_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: action.error,
        },
      };
    case types.LOAD_USERS_REQUEST:
      return {
        ...state,
        users: {
          loading: false,
          data: null,
          error: '',
        },
      };
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          data: action.data,
        },
      };
    case types.LOAD_USERS_FAILURE:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}

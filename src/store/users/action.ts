import { User } from '../../lib/interfaces/models';

export const types = {
  LOAD_USER_REQUEST: 'users/LOAD_USER_REQUEST',
  LOAD_USER_SUCCESS: 'users/LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE: 'users/LOAD_USER_FAILURE',

  LOAD_USERS_REQUEST: 'users/LOAD_USERS_REQUEST',
  LOAD_USERS_SUCCESS: 'users/LOAD_USERS_SUCCESS',
  LOAD_USERS_FAILURE: 'users/LOAD_USERS_FAILURE',
} as const;

export const actions = {
  loadUserRequest(id: string) {
    return { type: types.LOAD_USER_REQUEST, id };
  },
  loadUserSuccess(data: User) {
    return { type: types.LOAD_USER_SUCCESS, data };
  },
  loadUserFailure(error: any) {
    return { type: types.LOAD_USER_FAILURE, error };
  },
  loadUsersRequest() {
    return { type: types.LOAD_USERS_REQUEST };
  },
  loadUsersSuccess(data: User[]) {
    return { type: types.LOAD_USERS_SUCCESS, data };
  },
  loadUsersFailure(error: any) {
    return { type: types.LOAD_USERS_FAILURE, error };
  },
};

export type UserAction = ActionTypes<typeof actions>;

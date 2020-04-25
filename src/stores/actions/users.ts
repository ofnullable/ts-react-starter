import * as types from './types';
import { User } from '../models';

export const loadUsersRequest = () => ({ type: types.LOAD_USERS_REQUEST });
export const loadUsersSuccess = (data: User[]) => ({ type: types.LOAD_USERS_SUCCESS, data });
export const loadUsersFailure = (error: Error) => ({ type: types.LOAD_USERS_FAILURE, error: error.message });

export type UserAction = ReturnType<
  | typeof loadUsersRequest
  | typeof loadUsersSuccess
  | typeof loadUsersFailure
  >

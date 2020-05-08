import * as types from './types';
import { IUser } from '../models';

export interface loadUserAction {
  type: typeof types.LOAD_USER_REQUEST,
  id: number
}

export const loadUserRequest = (id: string) => ({ type: types.LOAD_USER_REQUEST, id });
export const loadUserSuccess = (data: IUser) => ({ type: types.LOAD_USER_SUCCESS, data });
export const loadUserFailure = (error: string) => ({ type: types.LOAD_USER_FAILURE, error });

export const loadUsersRequest = () => ({ type: types.LOAD_USERS_REQUEST });
export const loadUsersSuccess = (data: IUser[]) => ({ type: types.LOAD_USERS_SUCCESS, data });
export const loadUsersFailure = (error: string) => ({ type: types.LOAD_USERS_FAILURE, error });

export type UserAction = ReturnType<
  | typeof loadUserRequest
  | typeof loadUserSuccess
  | typeof loadUserFailure
  | typeof loadUsersRequest
  | typeof loadUsersSuccess
  | typeof loadUsersFailure
  >

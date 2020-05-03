import * as React from 'react';
import { Request } from 'express';
import { useSelector } from 'react-redux';
import { ReduxStore } from '../store';
import { AppState } from '../store/reducers';
import { loadUserRequest } from '../store/actions/users';
import User from '../components/User';

function UserContainer() {
  const { data, loading } = useSelector((state: AppState) => state.users.user);

  return <User user={data} loading={loading} />;
}

export const loadData = async ({ req, store }: { req: Request, store: ReduxStore }) => {
  store.dispatch(loadUserRequest(req.params.id));
}

export default UserContainer;
import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import { loadUserRequest } from '../store/actions/users';
import User from '../components/User';
import { LoadData } from '../server/ssrMiddleware';

function UserContainer() {
  const { data, loading } = useSelector((state: AppState) => state.users.user);

  return <User user={data} loading={loading} />;
}

export const loadData: LoadData = async ({ store, match }) => {
  store.dispatch(loadUserRequest(match.params.id));
};

export default UserContainer;

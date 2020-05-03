import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import Users from '../components/Users';

function UsersContainer() {
  const { data, loading } = useSelector((state: AppState) => state.users.users);

  return <Users users={data} loading={loading} />;
}

export default UsersContainer;
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import { loadUsersRequest } from '../store/actions/users';
import Users from '../components/Users';

function UsersContainer() {
  const { data, loading } = useSelector((state: AppState) => state.users.users);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data?.length || loading) return;
    dispatch(loadUsersRequest());
  }, [data, data?.length, loading]);

  return <Users users={data} loading={loading} />;
}

export default UsersContainer;
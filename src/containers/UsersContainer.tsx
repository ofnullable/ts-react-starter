import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../stores/reducers';
import { loadUsersRequest } from '../stores/actions/users';
import Users from '../components/Users';

const UsersContainer = () => {
  const { data, loading } = useSelector((state: AppState) => state.users.users);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data?.length || loading) return;
    dispatch(loadUsersRequest());
  }, [data, data?.length, loading]);

  return <Users users={data} loading={loading} />;
};

export default UsersContainer;
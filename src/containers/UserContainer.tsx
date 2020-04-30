import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import { loadUserRequest } from '../store/actions/users';
import User from '../components/User';

interface RouteParams {
  id: string
}

function UserContainer(props: any) {
  const { data, loading } = useSelector((state: AppState) => state.users.user);
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (loading || data && data.id === Number(params.id)) return;
    dispatch(loadUserRequest(params.id));
  }, [params, data, loading]);

  return <User user={data} loading={loading} />;
}

export default UserContainer;
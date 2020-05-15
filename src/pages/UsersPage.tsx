import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { loadUsersRequest } from '../store/actions/users';
import Users from '../components/Users';
import { AppState } from '../store/reducers';

interface UsersPageProps {
  route?: RouteConfig;
}

function UsersPage({ route }: UsersPageProps) {
  const { data, loading } = useSelector((state: AppState) => state.users.users)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data && !loading) {
      dispatch(loadUsersRequest());
    }
  }, [])

  return (
    <div className="container">
      <Users users={data} loading={loading} />
      {renderRoutes(route?.routes)}
    </div>
  );
}

export const loadData: LoadData = async ({ store }) => {
  store.dispatch(loadUsersRequest());
};

export default UsersPage;

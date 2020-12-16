import * as React from 'react';
import { useSelector } from 'react-redux';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Users from '../components/Users';
import { AppState } from '../store';
import { actions } from '../store/users/action';

interface UsersPageProps {
  route?: RouteConfig;
}

function UsersPage({ route }: UsersPageProps) {
  const { data, loading } = useSelector((state: AppState) => state.users.users);

  return (
    <div className="container">
      <Users users={data} loading={loading} />
      {renderRoutes(route?.routes)}
    </div>
  );
}

(UsersPage as Container<UsersPageProps>).preload = async ({ store }) => {
  if (!store.getState().users.users.data) {
    store.dispatch(actions.loadUsersRequest());
  }
};

export default UsersPage;

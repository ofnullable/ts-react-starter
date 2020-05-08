import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { loadUsersRequest } from '../store/actions/users';
import UsersContainer from '../containers/UsersContainer';
import { LoadData } from '../server/ssrMiddleware';

interface UsersPageProps {
  route?: RouteConfig;
}

function UsersPage({ route }: UsersPageProps) {
  return (
    <div className="container">
      <UsersContainer />
      {renderRoutes(route?.routes)}
    </div>
  );
}

export const loadData: LoadData = async ({ store }) => {
  store.dispatch(loadUsersRequest());
};

export default UsersPage;

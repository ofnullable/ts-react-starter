import * as React from 'react';
import { Request } from 'express';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { ReduxStore } from '../store';
import { loadUsersRequest } from '../store/actions/users';
import UsersContainer from '../containers/UsersContainer';

interface UsersPageProps {
  route?: RouteConfig
}

function UsersPage({ route }: UsersPageProps) {
  return (
    <div className="container">
      <UsersContainer />
      {renderRoutes(route?.routes)}
    </div>
  );
}

export const loadData = async ({ req, store }: { req: Request, store: ReduxStore }) => {
  store.dispatch(loadUsersRequest());
};

export default UsersPage;
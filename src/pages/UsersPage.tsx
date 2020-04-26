import * as React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';
import UsersContainer from '../containers/UsersContainer';

const UserContainer = loadable(() => import('../containers/UserContainer'));

const UsersPage = () => {
  return (
    <div className="container">
      <UsersContainer />
      <Route
        path="/users/:id"
        component={UserContainer}
      />
    </div>
  );
};

export default UsersPage;
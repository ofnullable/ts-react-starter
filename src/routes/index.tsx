import * as React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';
import { Route, Switch } from 'react-router-dom';

const HomePage = loadable(() => import('../pages/HomePage'));
const SamplePage = loadable(() => import('../pages/SamplePage'));
const UsersPage = loadable(() => import('../pages/UsersPage'));
const UserContainer = loadable(() => import('../containers/UserContainer'));
const ErrorPage = loadable(() => import('../pages/ErrorPage'));

interface Branch {
  path: string,
  exact?: boolean,
  routes?: Branch[]
  component: LoadableComponent<any>,
  render?: (props: unknown) => LoadableComponent<any>,
}

export const routes: Branch[] = [{
  path: '/',
  exact: true,
  component: HomePage,
}, {
  path: '/sample',
  component: SamplePage,
}, {
  path: '/users',
  component: UsersPage,
  routes: [{
    path: '/users/:id',
    component: UserContainer,
  }],
}];

const Router = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default Router;

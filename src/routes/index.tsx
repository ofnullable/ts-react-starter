import * as React from 'react';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('../pages/HomePage'));
const SamplePage = loadable(() => import('../pages/SamplePage'));
const UsersPage = loadable(() => import('../pages/UsersPage'));
const UserContainer = loadable(() => import('../containers/UserContainer'));
const ErrorPage = loadable(() => import('../pages/ErrorPage'));

export interface RouteConfig {
  path: string;
  exact?: boolean;
  routes?: RouteConfig[];
  component: React.ComponentType;
}

export const routes: RouteConfig[] = [{
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
}, {
  path: '*',
  component: ErrorPage,
}];

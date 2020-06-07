import * as React from 'react';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('../pages/HomePage'));
const UsersPage = loadable(() => import('../pages/UsersPage'));
const UserComponent = loadable(() => import('../components/User'));
const ErrorPage = loadable(() => import('../pages/ErrorPage'));

export interface RouteConfig {
  path: string;
  exact?: boolean;
  routes?: RouteConfig[];
  component: React.ComponentType;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/users',
    component: UsersPage,
    routes: [
      {
        path: '/users/:id',
        component: UserComponent,
      },
    ],
  },
  {
    path: '*',
    component: ErrorPage,
  },
];

import * as React from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';

const HomePage = loadable(() => import('../pages/HomePage'));
const SamplePage = loadable(() => import('../pages/SamplePage'));

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <HomePage />} />
      <Route path="/sample" render={() => <SamplePage />} />
    </Switch>
  );
};

export default Router;

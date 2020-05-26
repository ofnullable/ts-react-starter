import * as React from 'react';
import { Store } from 'redux';
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { LoadableComponent } from '@loadable/component';

import { routes } from './routes';
import AppLayout from './layouts/AppLayout';

import './styles/App.scss';

if (typeof Proxy === 'undefined') {
  require('immer').enableES5();
}

function App() {
  const store = useStore();
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      App.getInitialProps(store, location.pathname);
    }
  }, [location]);

  return <AppLayout>{renderRoutes(routes)}</AppLayout>;
}

App.getInitialProps = (store: Store, path: string): Promise<unknown>[] => {
  return matchRoutes(routes, path).map(async ({ route, match }) => {
    const comp: Container<typeof match.params> = await (route.component as LoadableComponent<unknown>).load();
    return comp.preload?.({ store, match }) || Promise.resolve();
  });
};

export default App;

import * as React from 'react';
import { Store } from 'redux';
import { useEffect, useMemo } from 'react';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { LoadableComponent } from '@loadable/component';

import { routes } from './routes';
import AppLayout from './layouts/AppLayout';
import './styles/App.scss';

if (typeof Proxy === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('immer').enableES5();
}

function App() {
  const store = useStore();
  const location = useLocation();
  const initPath = useMemo(() => location.pathname, []);

  useEffect(() => {
    if (initPath !== location.pathname) {
      App.getInitialProps(store, location.pathname, location.search);
    }
  }, [location]);

  return <AppLayout>{renderRoutes(routes)}</AppLayout>;
}

App.getInitialProps = (store: Store, path: string, search: string): Promise<unknown>[] => {
  return matchRoutes(routes, path).map(({ route, match }) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (route.component as LoadableComponent<unknown>).load().then(({ default: comp }: any) => {
      return (comp as Container<unknown>).preload?.({ store, match, search }) || Promise.resolve();
    })
  );
};

export default App;

import * as React from 'react';
import { renderRoutes } from 'react-router-config';

import AppLayout from './layouts/AppLayout';
import { routes } from './routes';

import './styles/App.scss';

if (typeof Proxy === 'undefined') {
  require('immer').enableES5();
}

function App() {
  return (
    <AppLayout>
      {renderRoutes(routes)}
    </AppLayout>
  );
}

export default App;

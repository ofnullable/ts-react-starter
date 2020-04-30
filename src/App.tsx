import * as React from 'react';

import AppLayout from './layouts/AppLayout';
import Router from './routes';
import './styles/App.scss';

if (typeof Proxy === 'undefined') {
  require('immer').enableES5();
}

function App() {
  return (
    <AppLayout>
      <Router />
    </AppLayout>
  );
}

export default App;

import * as React from 'react';
import AppLayout from './layouts/AppLayout';
import Router from './routes/index';

import './styles/app.scss';

const App = () => {
  return (
    <AppLayout>
      <Router />
    </AppLayout>
  );
};

export default App;

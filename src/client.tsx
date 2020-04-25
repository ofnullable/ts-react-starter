import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import App from './App';
import configureStore from './stores';

const store = configureStore(
  (window as any).__REDUX_STATE__,
  {}
);

delete (window as any).__REDUX_STATE__;
document.getElementById('preload-state')?.remove();

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}

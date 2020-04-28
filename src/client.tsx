import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';
import configureStore from './store';
import { AppState } from './store/reducers';

declare const window: Window & { __REDUX_STATE__: AppState };

const store = configureStore(window.__REDUX_STATE__, {});

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
})
  .then(() => delete window.__REDUX_STATE__);

if (module.hot) {
  module.hot.accept();
}

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';
import configureStore, { ReduxStore } from './store';

const store = configureStore({}, window.__REDUX_STATE__);
const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;

function renderApp(reduxStore: ReduxStore): void {
  return render(
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

// renderApp(store);
// loadableReady()
//   .then(() => renderApp(store))
//   .then(() => {
//     delete window.__REDUX_STATE__;
//     document.getElementById('redux-state')?.remove();
//   })
//   .catch(console.error);
renderApp(store);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept(['./App', './routes', './store'], () => {
    renderApp(store);
  });
}

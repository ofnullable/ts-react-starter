import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import { Store } from 'redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import createStore from './store';

const store = createStore(window.__REDUX_STATE__);
const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;

function renderApp(reduxStore: Store): void {
  return render(
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

renderApp(store);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept(['./App', './routes', './store'], () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newReducer = require('./store/reducers').default;
    store.replaceReducer(newReducer);
    renderApp(store);
  });
}

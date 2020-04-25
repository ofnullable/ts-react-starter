import { compose, createStore } from 'redux';

import reducers, { AppState } from './reducers';

interface AppContext {
  isServer?: boolean
}

function configureStore(preloadState: AppState | {}, context: AppContext) {
  const devtools = !context.isServer && (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  const enhancer = compose(
    devtools ? devtools() : (f: any) => f,
  );

  return createStore(reducers, preloadState, enhancer);
}

export default configureStore;

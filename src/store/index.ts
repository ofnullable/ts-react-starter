import { applyMiddleware, compose, createStore, Store, Action } from 'redux';
import createSagaMiddleware, { END, Task } from 'redux-saga';

import rootReducer, { AppState } from './reducers';
import rootSaga from './sagas';

interface AppContext {
  isServer?: boolean;
}

export interface ReduxStore extends Store<AppState, Action> {
  run: Task;
  close: () => END;
}

const prod = process.env.NODE_ENV === 'production';

function configureStore(reduxState: AppState | {}, context: AppContext) {
  const devtools = !context.isServer && window.__REDUX_DEVTOOLS_EXTENSION__;

  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    !prod && devtools ? devtools() : (f: any) => f
  );

  const store = createStore(rootReducer, reduxState, enhancer) as ReduxStore;

  store.run = sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);

  return store;
}

export default configureStore;

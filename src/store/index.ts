import { applyMiddleware, compose, createStore, Store, Action, Dispatch } from 'redux';
import createSagaMiddleware, { END, Task } from 'redux-saga';

import rootReducer, { AppState } from './reducers';
import rootSaga from './sagas';

declare const window: Window & { __REDUX_DEVTOOLS_EXTENSION__?: () => any };

interface AppContext {
  isServer?: boolean
}

const prod = process.env.NODE_ENV === 'production';

function configureStore(reduxState: AppState | {}, context: AppContext) {
  const devtools = !context.isServer && window.__REDUX_DEVTOOLS_EXTENSION__;

  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    !prod && devtools ? devtools() : (f: any) => f,
  );

  const store = createStore(rootReducer, reduxState, enhancer) as
    Store<AppState, Action> & { dispatch: Dispatch<any>, run: Task, close: () => END };

  store.run = sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);

  return store;
}

export default configureStore;

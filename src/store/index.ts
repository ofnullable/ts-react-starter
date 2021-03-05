import { Store } from 'redux';
import createSagaMiddleware, { END, Task } from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer, { RootState } from './reducers';
import saga from './sagas';

interface AppContext {
  userAgent?: string;
  locale?: string;
}

interface ReduxStore extends Store<RootState> {
  run: Task;
  close: () => END;
}

function store(preloadedState?: RootState, ctx?: AppContext): ReduxStore {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
  }) as ReduxStore;

  store.run = sagaMiddleware.run(saga);
  store.close = () => store.dispatch(END);

  return store;
}

export { RootState } from './reducers';
export default store;

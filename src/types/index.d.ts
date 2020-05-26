import { ComponentType } from 'react';
import { Store } from 'redux';
import { match } from 'react-router-dom';
import { AppState } from '../store/reducers';

declare global {
  interface Window {
    __REDUX_STATE__: AppState;
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }

  export interface Context<T> {
    store: Store<AppState>;
    match: match<T>;
  }
  type Preload<T> = (ctx: Context<T>) => Promise<unknown>;
  type Container<T> = ComponentType<T> & { preload?: Preload<T> };
}

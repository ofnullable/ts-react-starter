import { AppState } from '../store/reducers';

declare global {
  interface Window {
    __REDUX_STATE__: AppState;
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}

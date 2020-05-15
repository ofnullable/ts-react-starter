import { AppState } from '../store/reducers';
import { Context } from '../server/ssrMiddleware';

declare global {
  interface Window {
    __REDUX_STATE__: AppState;
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
  export type LoadData = (ctx: Context) => Promise<any>;
}

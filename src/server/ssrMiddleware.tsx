import * as express from 'express';
import * as React from 'react';
import { resolve } from 'path';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { StaticRouter, match } from 'react-router-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { LoadableComponent } from '@loadable/component';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import App from '../App';
import { routes } from '../routes';
import configureStore, { ReduxStore } from '../store';

export interface Context {
  store: ReduxStore;
  match: match<any>;
}

type DataLoader = React.ComponentType<any> & { loadData?: LoadData };

const router = express.Router();

const statsFile = resolve('./build/loadable-stats.json');

router.get('*', async (req, res, next) => {
  const context = {};
  const store = configureStore({}, { isServer: true });
  const sagaPromises = store.run.toPromise();

  await Promise.all(
    matchRoutes(routes, req.path)
      .map(async ({ route, match }) => {
        const comp: DataLoader = await (route.component as LoadableComponent<any>).load();
        return comp.loadData ? comp.loadData({ store, match }) : Promise.resolve();
      })
  );

  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </ChunkExtractorManager>
  );

  renderToStaticMarkup(jsx);
  store.close();

  try {
    await sagaPromises;
  } catch (e) {
    return next(e);
  }

  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const reduxState = `<script id="redux-state">__REDUX_STATE__ = ${stateString}</script>`;

  const tags = {
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
    scripts: reduxState + extractor.getScriptTags(),
  };

  return res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>TS React Starter!</title>
        ${tags.styles}
        ${tags.links}
    </head>
    <body>
        <div id="root">${renderToString(jsx)}</div>
        ${tags.scripts}
    </body>
    </html>
  `);
});

export default router;

import * as express from 'express';
import * as React from 'react';
import { resolve } from 'path';
import { Provider } from 'react-redux';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import App from './App';
import configureStore from './stores';

const app = express();

const prod = process.env.NODE_ENV === 'production';
const statsFile = resolve('./build/loadable-stats.json');

if (!prod) {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js');

  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      heartbeat: 2000,
      publicPath: '/',
      serverSideRender: true,
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(
  express.static(resolve('./build'), {
    index: false,
  })
);

app.get('*', async (req, res, next) => {
  if (req.url.includes('favicon')) return res.sendStatus(404);

  const context = {};
  const store = configureStore({}, { isServer: true });
  const sagaPromises = store.run.toPromise();

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
    next(e);
  }

  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const reduxState = `<script id="redux-state">__REDUX_STATE__ = ${stateString}</script>`;

  const tags = {
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
    scripts: reduxState + extractor.getScriptTags(),
  };

  res.set('content-type', 'text/html');
  return res.send(`
    <!doctype html>
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started http://localhost:${port}`));

import * as express from 'express';
import * as React from 'react';
import { resolve } from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import App from './App';

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
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(
  express.static(resolve('./build'), {
    index: false,
  })
);

app.get('*', (req, res) => {
  if (req.url.includes('favicon')) return res.status(404).end();

  const context = {};
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

  const html = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ChunkExtractorManager>
  );

  const tags = {
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
    scripts: extractor.getScriptTags(),
  };

  res.set('content-type', 'text/html');
  res.send(`
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
        <div id="root">${html}</div>
        ${tags.scripts}
    </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started http://localhost:${port}`));

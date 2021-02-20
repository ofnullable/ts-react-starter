import * as React from 'react';
import { resolve } from 'path';
import { Middleware } from 'koa';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import App from '../../App';
import configureStore from '../../store';

const statsFile = resolve('./build/loadable-stats.json');

const renderer: Middleware = async (ctx) => {
  const store = configureStore(undefined, { userAgent: ctx.header['user-agent'] });

  const sagaPromises = store.run.toPromise();

  await Promise.all(App.getInitialProps(store, ctx.path, ctx.url.replace(ctx.path, '')));

  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

  const jsx = extractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={ctx.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  renderToStaticMarkup(jsx);
  store.close();

  try {
    await sagaPromises;
  } catch (e) {
    return ctx.throw(e);
  }

  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const reduxState = `<script id="redux-state">__REDUX_STATE__ = ${stateString}</script>`;

  const tags = {
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
    scripts: reduxState + extractor.getScriptTags(),
  };

  return (ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>TS REACT STARTER</title>
        ${tags.links}
        ${tags.styles}
    </head>
    <body>
        <div id="root">${renderToString(jsx)}</div>
        ${tags.scripts}
    </body>
    </html>
  `);
};

export default renderer;

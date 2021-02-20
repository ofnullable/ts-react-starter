/* eslint-disable @typescript-eslint/no-var-requires */
import { Middleware } from 'koa';
import { PassThrough } from 'stream';

const webpack = require('webpack');
const config = require('../../../config/webpack.client.config');

const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  index: false,
  serverSideRender: true,
  publicPath: config.output.publicPath,
});

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

export const devMiddleware: Middleware = (ctx, next) => {
  // wait for webpack-dev-middleware to signal that the build is ready
  const ready = new Promise((resolve, reject) => {
    for (const comp of [].concat(compiler.compilers || compiler)) {
      (comp as any).hooks.failed.tap('KoaWebpack', (e: Error) => {
        reject(e);
      });
    }

    webpackDevMiddleware.waitUntilValid(() => {
      resolve(true);
    });
  });
  // tell webpack-dev-middleware to handle the request
  const init = new Promise<void>((resolve) => {
    webpackDevMiddleware(
      ctx.req,
      {
        end: (content: unknown) => {
          // eslint-disable-next-line no-param-reassign
          ctx.body = content;
          resolve();
        },
        getHeader: ctx.get.bind(ctx),
        setHeader: ctx.set.bind(ctx),
        locals: ctx.state,
      },
      () => resolve(next())
    );
  });

  return Promise.all([ready, init]);
};

export const hotMiddleware: Middleware = async (ctx, next) => {
  if (ctx.request.path != '/__webpack_hmr') {
    return await next();
  }

  const stream = new PassThrough();
  ctx.body = stream;
  await webpackHotMiddleware(
    ctx.req,
    {
      write: stream.write.bind(stream),
      writeHead: (status: number, headers: { [key: string]: string | string[] }) => {
        ctx.status = status;

        Object.keys(headers).forEach((key) => {
          ctx.set(key, headers[key]);
        });
      },
      end: () => {
        stream.end();
      },
    },
    next
  );
};

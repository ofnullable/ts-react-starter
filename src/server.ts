import * as Koa from 'koa';
import * as serve from 'koa-static';
import { resolve } from 'path';
import renderer from './lib/middleware/renderer';

const isProd = process.env.NODE_ENV === 'production';
const app = new Koa();

if (!isProd) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { devMiddleware, hotMiddleware } = require('./lib/middleware/HMR');
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

app.use(serve(resolve('./public'), { index: false }));

app.use(serve(resolve('./build'), { index: false }));

app.use(renderer);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port} 🚀`);
});

import * as express from 'express';
import { resolve } from 'path';
import ssrMiddleware from './server/ssrMiddleware';
import { webpackDevMiddleware, webpackHotMiddleware } from './server/HMR';

const prod = process.env.NODE_ENV === 'production';

const app = express();

app.disable('etag');
app.disable('x-powered-by');

app.use(
  express.static(resolve('./build'), {
    index: false,
  })
);

if (!prod) {
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
}

app.use(ssrMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚦 Server running on port: ${port} 🚦`);
});

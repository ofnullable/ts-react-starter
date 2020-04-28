import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
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

interface HttpError {
  status?: number,
  message?: string,
}

app.use((err: HttpError, req: Request, res: Response, _: NextFunction) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  return res.status(err.status).json({ message: err.message });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚦 Server running on port: ${port} 🚦`);
});
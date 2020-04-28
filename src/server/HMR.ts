/**
 * Hot Module Replacement middlewares
 */
const webpack = require('webpack');
const webpackConfig = require('../../webpack.client.js');

const compiler = webpack(webpackConfig);

export const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  serverSideRender: true,
});

export const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

/**
 * webpack 'H'ot 'M'odule 'R'eplacement
 */
const webpack = require('webpack');
const config = require('../../webpack.client.js');

const compiler = webpack(config);

export const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  serverSideRender: true,
});

export const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

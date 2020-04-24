const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const { prod } = require('./webpack.config');
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&reload=true`;

const loaders = {
  html: {
    loader: 'html-loader',
  },
  babel: {
    loader: 'babel-loader',
  },
  ts: {
    loader: 'ts-loader',
  },
  style: prod ? MiniCssExtractPlugin.loader : 'style-loader',
  css: 'css-loader',
  sass: 'sass-loader',
};

module.exports = {
  mode: prod ? 'production' : 'development',

  devtool: prod ? 'hidden-source-map' : 'inline-source-map',

  target: 'web',

  entry: {
    client: prod ? './src/client.tsx' : ['./src/client.tsx', hotMiddlewareScript],
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [loaders.babel, loaders.ts],
    }, {
      test: /\.css$/,
      use: [loaders.style, loaders.css],
    }, {
      test: /\.s[ac]ss$/,
      use: [loaders.style, loaders.css, loaders.sass],
    }],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin(),
    ...(prod
      ? [
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[hash:8].css',
          chunkFilename: 'static/css/[name].[hash:8].chunk.css',
        }),
      ]
      : []),
  ],
};

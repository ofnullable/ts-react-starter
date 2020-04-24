const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { prod } = require('./webpack.config');

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
  css: {
    loader: 'css-loader',
    options: {
      onlyLocals: true,
    },
  },
  sass: 'sass-loader',
};

module.exports = {
  mode: prod ? 'production' : 'development',

  target: 'node',

  node: false,

  entry: {
    server: './src/server.tsx',
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
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

  externals: ['@loadable/component', nodeExternals()],
};

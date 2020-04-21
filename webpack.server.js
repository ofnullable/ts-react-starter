const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { prod } = require('./webpack.config');

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
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  externals: ['@loadable/component', nodeExternals()],
};

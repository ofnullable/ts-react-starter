const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&reload=true`;

const loaders = {
  babel: {
    loader: 'babel-loader',
  },
  ts: {
    loader: 'ts-loader',
  },
  style: prod ? MiniCssExtractPlugin.loader : 'style-loader',
  css: 'css-loader',
  sass: 'sass-loader',
  postcss: 'postcss-loader',
  url: {
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'static/media/[name].[hash:8].[ext]',
    },
  },
};

module.exports = {
  mode: prod ? 'production' : 'development',

  devtool: prod ? 'hidden-source-map' : 'inline-source-map',

  target: 'web',

  entry: {
    client: prod ? './src/client.tsx' : ['./src/client.tsx', hotMiddlewareScript],
  },

  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [loaders.babel, loaders.ts],
    }, {
      test: /\.(c|sc|sa)ss$/,
      use: [loaders.style, loaders.css, loaders.postcss, loaders.sass],
    }, {
      test: /\.(jpe?g|png|gif|bmp)$/,
      use: [loaders.url],
    }],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new LoadablePlugin(),
    new CleanWebpackPlugin(),
    prod ?
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash:8].css',
        chunkFilename: 'static/css/[name].[hash:8].chunk.css',
      })
      : new webpack.HotModuleReplacementPlugin(),
  ],
};

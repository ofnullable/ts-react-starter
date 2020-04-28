const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const loaders = {
  babel: {
    loader: 'babel-loader',
  },
  ts: {
    loader: 'ts-loader',
  },
  style: 'style-loader',
  css: {
    loader: 'css-loader',
    options: {
      onlyLocals: true,
    },
  },
  sass: 'sass-loader',
  postcss: 'postcss-loader',
  url: {
    loader: 'url-loader',
    options: {
      limit: 8192,
      emitFile: false,
      name: 'static/media/[name].[hash:8].[ext]',
    },
  },
};

module.exports = {
  mode: prod ? 'production' : 'development',

  target: 'node',

  node: {
    __dirname: false,
  },

  entry: {
    server: './src/server',
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

  externals: [nodeExternals()],

  plugins: [new CleanWebpackPlugin()],
};

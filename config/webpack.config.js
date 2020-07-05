const { resolve } = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const loaders = require('./loaders');

const mode = process.env.NODE_ENV;
const isProd = mode === 'production';
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&reload=true`;

const clientLoaders = loaders('client');
const serverLoaders = loaders('server');

const base = {
  mode,
  devtool: isProd ? 'hidden-source-map' : 'inline-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

const client = {
  ...base,
  target: 'web',

  entry: {
    client: isProd ? './src/client.tsx' : ['./src/client.tsx', hotMiddlewareScript],
  },

  output: {
    path: resolve(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [clientLoaders.babel, clientLoaders.ts],
        exclude: /node_modules/,
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [clientLoaders.style, clientLoaders.css, clientLoaders.postcss, clientLoaders.sass],
      },
      {
        test: /\.(jpe?g|png|gif|bmp)$/,
        use: [clientLoaders.url],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [],
    }),
    new LoadablePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    isProd
      ? new MiniCssExtractPlugin({
          filename: 'static/css/[name].[hash:8].css',
          chunkFilename: 'static/css/[name].[hash:8].chunk.css',
        })
      : new webpack.HotModuleReplacementPlugin(),
  ],
};

const server = {
  ...base,
  target: 'node',

  node: {
    __dirname: false,
  },

  entry: {
    server: './src/server.ts',
  },

  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [serverLoaders.babel, serverLoaders.ts],
        exclude: /node_modules/,
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [serverLoaders.style, serverLoaders.css, serverLoaders.postcss, serverLoaders.sass],
      },
      {
        test: /\.(jpe?g|png|gif|bmp)$/,
        use: [serverLoaders.url],
      },
    ],
  },

  externals: [nodeExternals()],

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [],
    }),
  ],
};

module.exports = [client, server];

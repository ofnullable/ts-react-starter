const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

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
  style: 'style-loader',
  css: {
    loader: 'css-loader',
    options: {
      onlyLocals: true,
    },
  },
  sass: 'sass-loader',
  postcss: {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
        require('cssnano'),
      ],
    }
  },
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
      test: /\.s[ac]ss$/,
      use: [loaders.style, loaders.css, loaders.postcss, loaders.sass],
    }],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  externals: [nodeExternals()],

  plugins: [new CleanWebpackPlugin()],
};

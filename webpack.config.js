const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
	style: [
		prod ? MiniCssExtractPlugin.loader : 'style-loader',
		'css-loader',
	],
};

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		app: resolve(__dirname, 'src/index.tsx'),
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	output: {
		path: resolve(__dirname, 'build'),
		filename: 'static/js/[name].[contenthash].js',
	},
	module: {
		rules: [{
			test: /.jsx?$/,
			loader: loaders.babel,
		}, {
			test: /.tsx?$/,
			use: [loaders.babel, loaders.ts],
		}, {
			test: /.css$/,
			use: loaders.style,
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: 'public/index.html',
			minify: {
				collapseWhitespace: true,
			},
		}),
		new CleanWebpackPlugin(),
		...(prod
			? [
				new MiniCssExtractPlugin({
					filename: 'static/css/[name].[contenthash:8].css',
					chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
				}),
			]
			: []),
	],
	module: {
		rules: [{
			test: /.tsx?$/,
			use: ['babel-loader', 'ts-loader'],
		}],
	},
};
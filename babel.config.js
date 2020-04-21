module.exports = {
	presets: [
		'@babel/preset-react',
		'@babel/preset-typescript',
		['@babel/preset-env', {
			corejs: { 'version': 3, 'proposals': true },
			useBuiltIns: 'usage',
			modules: false,
		}],
	],
};
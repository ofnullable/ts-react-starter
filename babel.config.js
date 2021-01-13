module.exports = {
  presets: [['@babel/preset-env'], ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@loadable/babel-plugin',
    [
      '@emotion',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    ],
  ],
};

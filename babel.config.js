module.exports = {
  presets: [
    ['react-app'],
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
  ],
  plugins: [
    '@loadable/babel-plugin',
    [
      '@emotion',
      {
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
  ],
};

module.exports = {
  presets: [['react-app', { typescript: true }]],
  plugins: [
    '@loadable/babel-plugin',
    [
      'babel-plugin-emotion',
      {
        sourceMap: true,
      },
    ],
  ],
};

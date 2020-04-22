module.exports = (api) => {
  const webpack = api.caller((caller) => caller && caller.name === 'babel-loader');
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          corejs: { version: 3, proposals: true },
          useBuiltIns: 'usage',
          modules: webpack ? false : 'commonjs',
        },
      ],
    ],
    plugins: ['@loadable/babel-plugin'],
  };
};

module.exports.prod = process.env.NODE_ENV === 'production';

module.exports = (env) => {
  return require(`./webpack.${env}.js`);
};

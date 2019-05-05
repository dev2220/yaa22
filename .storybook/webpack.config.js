const path = require('path');
const customConfig = require('../webpack.config.js');

module.exports = ({config}) => {
  config.module.rules = config.module.rules.filter(
    r => '/\\.css$/' !== r.test.toString()
  );
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  });
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./src'),
  ];
  return config;
};

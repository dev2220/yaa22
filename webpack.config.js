const path = require('path');
const {HotModuleReplacementPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'public'),
  dist: path.resolve(__dirname, 'dist'),
  html: path.resolve(__dirname, 'src/index.html'),
  icon: path.resolve(__dirname, 'src/favicon.ico'),
  node_modules: path.resolve(__dirname, 'node_modules'),
};
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    // mode: 'development',

    stats: 'errors-only',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.json'],
      modules: [paths.src, paths.node_modules],
    },
    entry: [paths.src],
    output: {
      path: paths.dist,
      publicPath: '/',
      filename: `[name]-[${isProd ? 'contenthash' : 'hash'}].js`,
    },
    plugins: [
      new MiniCssExtractPlugin({filename: 'style.css'}),
      new HtmlWebpackPlugin({template: paths.html}),
      new CopyWebpackPlugin([{from: `${paths.public}/`, to: paths.dist}]),
    ].concat(isProd ? [new CleanWebpackPlugin()] : [new HotModuleReplacementPlugin()]),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: paths.node_modules,
          use: ['babel-loader'],
        },
        {
          test: /\.ya?ml$/,
          use: [{loader: 'json-loader'}, {loader: 'yaml-loader'}],
        },
        {
          test: /\.(png|jpg|gif)(\?.*)?$/,
          use: 'url-loader?limit=100000',
          exclude: paths.node_modules,
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: ['eslint-loader']
        // }
      ],
    },
    optimization: isProd
      ? {
          splitChunks: {
            chunks: 'all',
          },
        }
      : undefined,
    devServer: isProd
      ? undefined
      : {
          contentBase: path.dist,
          port: 3000,
          historyApiFallback: true,
          hot: true,
        },
  };
};

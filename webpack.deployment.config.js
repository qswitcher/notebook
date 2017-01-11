var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

/**
Borrowed concepts from https://blog.hellojs.org/setting-up-your-react-es6-development-environment-with-webpack-express-and-babel-e2a53994ade#.o1wmiqmas
*/
var config = {
  devtool: 'source-map',

  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
      loaders: [
          {
              test: /.jsx?$/,
              loader: 'babel-loader',
              include: path.join(__dirname, 'src'),
              exclude: /node_modules/,
              query: {
                  presets: ['es2015', 'react', 'stage-2']
              }
          },
          {
              test: /\.less$/,
              loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'),
          },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          }
      ]
  },
  plugins: [
    new ExtractTextPlugin("dist/bundle.css"),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
    })
  ],
  resolve: {
      root: [
          path.resolve(__dirname, "src/client/app"),
          path.resolve(__dirname,"node_modules")
      ]
  }
};

module.exports = config;

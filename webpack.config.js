var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
      inline: true,
      contentBase: './dist'
  },
  module: {
      loaders: [
          {
              test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['es2015', 'react']
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
    new ExtractTextPlugin("build/bundle.css"),
    new HtmlWebpackPlugin({
		template: './src/index.html'
	}),
  ],
  resolve: {
      root: [
          path.resolve(__dirname, "src/client/app"),
          path.resolve(__dirname,"node_modules")
      ]
  }
};

module.exports = config;

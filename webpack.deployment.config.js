var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

const VENDOR_LIBS = [
    'axios',
    'bootstrap',
    'normalize.css',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
    'redux-form',
    'redux-thunk'
];


/**
Borrowed concepts from https://blog.hellojs.org/setting-up-your-react-es6-development-environment-with-webpack-express-and-babel-e2a53994ade#.o1wmiqmas
*/
var config = {
  devtool: 'source-map',
  entry: {
      bundle: APP_DIR + '/index.js',
      vendor: VENDOR_LIBS
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js'
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
              test: /\.css$/, loader: ExtractTextPlugin.extract({
                 fallbackLoader: "style-loader",
                 loader: "css-loader"
              })
          }
      ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.[chunkhash].css"),
    new HtmlWebpackPlugin({
		template: 'src/index.template.ejs',
        inject: 'body'
	}),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    })
  ],
  resolve: {
      modules: [
          path.resolve(__dirname, "src/client/app"),
          path.resolve(__dirname,"node_modules")
      ]
  }
};

module.exports = config;

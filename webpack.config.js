var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

const VENDOR_LIBS = [
    'axios',
    'normalize.css',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
    'redux-form',
    'redux-thunk'
];

var config = {
  entry: {
      bundle: APP_DIR + '/index.js',
      vendor: VENDOR_LIBS
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js'
  },
  module: {
      rules: [
          {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              include: path.join(__dirname, 'src'),
              exclude: /node_modules/,
              query: {
                  presets: ['es2015', 'react', 'stage-2']
              }
          },
          {
              test: /\.less$/,
              loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'),
          },
          {
              test: /\.css$/, loader: ExtractTextPlugin.extract({
                 fallbackLoader: "style-loader",
                 loader: "css-loader"
              })
          },
          {
              test: /\.png$/,
              loader: "url-loader?limit=100000"
          },
          {
              test: /\.jpg$/,
              loader: "file-loader"
          },
          {
              test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url?limit=10000&mimetype=application/font-woff'
          },
          {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url?limit=10000&mimetype=application/octet-stream'
          },
          {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'file'
          },
          {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url?limit=10000&mimetype=image/svg+xml'
          }
      ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.[chunkhash].css"),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
		template: 'src/index.template.ejs',
        inject: 'body'
	}),
    new AssetsPlugin({
        path: path.join(__dirname, 'dist'),
        filename: 'assets.json'
    })
  ],
  resolve: {
      modules: [
          path.resolve(__dirname, "src/client/app"),
          path.resolve(__dirname,"node_modules")
      ]
  },
  devtool: 'source-map'
};

module.exports = config;

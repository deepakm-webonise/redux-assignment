'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var rootPath = path.join(__dirname, '../..');
const NODE_ENV = process.env.NODE_ENV || '';

module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: {
    index: [
      path.join(rootPath, 'src/js/index.js')
    ]
  },
  output: {
    path: path.resolve(rootPath, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      chunks: ['index']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
        { from: path.join(rootPath,'src/static/images'), to: 'assets/images' },
        { from: path.join(rootPath,'src/static/files'), to: 'assets/files' }
    ])
  ],
  resolve: {
    alias: {
        config$: path.resolve(rootPath, 'config', NODE_ENV),
        constants: path.resolve(rootPath, 'src/js/constants/'),
        utilities: path.resolve(rootPath, 'src/js/utils/'),
        routes: path.resolve(rootPath, 'src/js/routes/'),
        actions: path.resolve(rootPath, 'src/js/actions/'),
        reducers: path.resolve(rootPath, 'src/js/reducers/'),
        components: path.resolve(rootPath, 'src/js/components/'),
        images: path.resolve(rootPath, 'src/static/images'),
        style: path.resolve(rootPath, 'src/stylesheets')
    },
    extensions: ['.js', '.jsx', '.json','.css', '.sass']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|bower_components|vendors)/,
        use: 'eslint-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|pdf|ico)$/,
        use: 'file-loader'
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
};

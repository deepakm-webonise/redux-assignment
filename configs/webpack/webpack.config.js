'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var rootPath = path.join(__dirname, '../..');
const NODE_ENV = process.env.NODE_ENV || '';


function BuildCompletionNotifyPlugin() {
};

BuildCompletionNotifyPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tap("MyPlugin", () => {
    console.log(' Build process done!!!');
  });
};


module.exports = {
  mode: 'production',
  entry: {
    index: [
      path.join(rootPath, 'src/js/index.js')
    ]
  },
  output: {
    path: path.join(rootPath, '/dist/'),
    filename: '[name]-[hash].min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      chunks: ['index']
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
      chunkFilename: "[id]-[hash].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: 4
    }),
    new BuildCompletionNotifyPlugin(),
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
    extensions: ['.js', '.jsx', '.json','.css']
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
        exclude: /(node_modules|bower_components)/,
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
  }
};

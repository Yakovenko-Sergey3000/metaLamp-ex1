const path = require('path');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_MODE === 'development';

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:  isDev ? 'js/[name].[hash].js' : 'js/index.js',
    clean: true,
    assetModuleFilename: isDev ? 'assets/[hash][ext]' : 'assets/[name][ext]' 
  },
  mode: 'development',
  devtool: isDev ? 'source-map' : false,
  plugins: [
      new HtmlWepbackPlugin({
          filename: 'index.html',
          template: './src/index.pug',
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? 'css/[name].[hash].css' : 'css/style.css',
      }),
      new webpack.HotModuleReplacementPlugin()
  ],
  module: {
      rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
          },
          {
            test:/\.(pug)$/i,
            loader: 'pug-loader',
            options: {
              pretty: isDev
            }
          },
          {
            test: /\.css$/i,
            use: [
              MiniCssExtractPlugin.loader, 
              'css-loader'
            ]
          },
          {
            test: /\.s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
               "css-loader",
               {
                 loader: 'postcss-loader',
                 options: {
                   postcssOptions: { path: './webpackConfig.postcss.config.js' }
                 }
               },
              "sass-loader",
            ]
          },
      ]
  },
  devServer: {
    port: 3000
  }
}
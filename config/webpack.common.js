/**
 * 配置 webpack 的公用选项
 */
const path = require('path');
const loaders = require('./loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const addAssetsHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

/* 解析文件路径函数 */
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  entry: resolve('../src/main.js'),
  output: {
    filename: 'static/js/app-[hash].js',
    path: resolve('../dist')
  },
  resolve: {
    /* 默认可以不写的后缀，不建议写的太多，浪费性能 */
    extensions: ['.vue', '.js'],
    /* 配置别名 */
    alias: {
      '@': resolve('../src'),
    }
  },
  module: {
    ...loaders
  },
  plugins: [
    /* 复制 Html 模版 */
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: resolve('../dist/index.html')
    }),
    /* 复制文件 */
    new CopyWebpackPlugin([
      {
        from: resolve('../public'),
        to: resolve('../dist/static'),
        ignore: ['*.html']
      }
    ]),
    /* vue-loader 插件 */
    new VueLoaderPlugin(),
    /* 提取 css 样式到单独的文件 */
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]-[hash].css',
      chunkFilename: 'static/css/[id]~[hash].css',
      ignoreOrder: false
    }),
    /* 引入插件，并赋值到全局变量中，如下面的 $ 变量 */
    new webpack.ProvidePlugin({
      // $: 'jquery'
    }),
    new addAssetsHtmlWebpackPlugin({
      filepath: resolve('../dll/vendors.dll.js'),
      publicPath: 'static/js',
      outputPath: 'static/js'
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve('../dll/vendors.manifest.json')
    })
  ],
  optimization: {
    /* 代码分割设置 */
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'static/js/vendors~[hash].js'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'static/js/common~[hash].js'
        }
      }
    }
  }
};

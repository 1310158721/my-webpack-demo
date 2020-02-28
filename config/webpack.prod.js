/**
 * 配置 webpack 生产环境选项
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  /* development 不会压缩打包后的 js 代码，production 会压缩代码 */
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  devtool: 'none',
  plugins: [
    /* 清除文件 */
    new CleanWebpackPlugin(),
    /* 设置环境变量，获取时 process.env.STRING */
    new webpack.DefinePlugin({
      /* 必须字符串化 */
      'process.env.STRING': JSON.stringify('生产环境')
    })
  ],
  optimization: {
    /* 压缩打包后的 Css 代码 */
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});

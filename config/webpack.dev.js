/**
 * 配置 webpack 开发环境选项
 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

/**
 * 解析文件路径函数
 * @param {路径参数} dir 
 */
const resolve = dir => path.resolve(__dirname, dir);

module.exports = merge(common, {
  /* development 不会压缩打包后的 js 代码，production 会压缩代码 */
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    /* 启动服务的根目录 */
    contentBase: resolve('../dist'),
    /* 打开浏览器 */
    // open: true,
    /* 设置默认端口 */
    port: 8090,
    hot: true,
    hotOnly: true
  },
  plugins: [
    /* 设置环境变量，获取时 process.env.STRING */
    new webpack.DefinePlugin({
      /* 必须字符串化 */
      'process.env.STRING': JSON.stringify('开发环境')
    })
  ],
  /* 优化项 */
  // optimization: {
  //   /* 开启 tree-shaking 功能 */
  //   usedExports: true
  // }
});

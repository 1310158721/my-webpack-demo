/**
 * 用于优化 webpack 打包速度
 */

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* 解析文件路径函数 */
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  mode: 'production',
  entry:  {
    vendors: ['vue', 'jquery', 'element-ui']
  },
  output: {
    filename: '[name].dll.js',
    path: resolve('../dll'),
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve('../dll/[name].manifest.json')
    })
  ]
}

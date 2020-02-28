/**
 * 配置公用的 loaders
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* 用于配置 css 前缀自动补齐 */
const autoprefixer = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')({
        overrideBrowserslist: ['last 2 version'] // 兼容信息设置
      })
    ]
  }
}

module.exports = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
        // options: {
        //   /**
        //    * options 的内容可以提取到根目录的 .babelrc 文件上
        //    * 配置 useBuiltIns 选项是为了不把 @babel/polyfill 文件整个打包
        //    * 按需引入 @babel/polyfill
        //    */
        //   presets: [['@babel/preset-env', {
        //     useBuiltIns: 'usage', // 使用该选项 @babel/polyfill 会默认被引入了，因此不用再额外引入
        //     corejs: 2
        //   }]]
        // }
      }
    },
    {
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        autoprefixer
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        autoprefixer,
        'sass-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        autoprefixer,
        'less-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader' /* 需要同时安装 file-loader 使用 */,
          options: {
            name: 'static/img/[name]-[hash].[ext]',
            limit: 1024 * 5
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|svg|ttf|eot)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024 * 100
        }
      }
    }
  ]
};

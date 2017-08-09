const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

let config = {
  entry: {
    'common' : ['react', 'react-dom', 'react-document-title']
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: 'static/js/[name]-[chunkhash:8].js',
    // 添加 chunkFilename
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: 'babel-loader?cacheDirectory' //babel编译过程很耗时，好在babel-loader提供缓存编译结果选项，在重启webpack时不需要创新编译而是复用缓存结果减少编译流程
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpeg|jpg|gif|eot|woff|ttf|woff2|svg)$/,
        loader: 'url-loader?limit=8192&name=static/images/[hash:8].[name].[ext]'
      },
      {
        test: /\.(docx?|pdf|xlsx)/,
        loader: 'file-loader?name=others/[name]-[hash:8].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', 'scss', 'less'],
  },
  devtool: 'source-map',
  plugins: [
    // 将样式抽离出来作为单独的文件
    new ExtractTextPlugin('static/css/[name]-[contenthash:8].css'),
    // 将公共代码抽离出来合并为一个文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 3,
    })
  ]
}

let entrys = path.join(__dirname, 'public/views/pages/');
const entries = glob.sync(entrys + '*').map(function(entry) {
  return {name: path.basename(entry), path: entry}
});
entries.forEach(function(entry) {
  //添加entry
  config.entry[entry.name] = [entry.path];
  const tpl = path.join(__dirname, 'public/views/template/tpl.html');
  //生成html
  config.plugins.push(new HtmlWebpackPlugin({
    filename: `views/${entry.name}.hbs`,
    template: tpl,
    chunks: [
      entry.name, 'common'
    ],
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }));
});

module.exports = config;

const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const webpackDevConfig = require('./webpack.dev.config.js');
const open = require('open');

gulp.task('clean', function(cb) {
  gulp.src([webpackConfig.output.path]).pipe(clean({force: true}));
  cb();
});

gulp.task('webpack-dev-server', function() {
  const port = webpackDevConfig.devServer.port;
  const host = webpackDevConfig.devServer.host;
  //由于inline模式只有通过webpack-dev-server命令启动时才会起作用，所以执行这个任务启动时无法实现自动刷新；
  //为了能够实现自动刷新，webpack官网给的方案就是为每个entry增加一个配置；
  for (let key in webpackDevConfig.entry) {
    webpackDevConfig.entry[key].unshift("webpack-dev-server/client?http://" + host + ":" + port);
  }
  const compiler = webpack(webpackDevConfig);
  const server = new webpackDevServer(compiler, webpackDevConfig.devServer);

  server.listen(port, host, function(err) {
    if (err) {
      console.log('gulpfile.js:::::' + err);
      return false;
    }
    gutil.log('[webpack-dev-server]', 'http://127.0.0.1:' + port + '/[your-page-name]');
    open(`http://${host}:${port}`);
  })
})

gulp.task('start', [
  'clean', 'webpack-dev-server'
], function(callback) {
  callback()
})

gulp.task('release', function() {
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      gutil.log("webpack:" + err);
      return false;
    }
    gutil.log('[webpack:build]', stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }));
  })
})

gulp.task('debug',['clean'], function() {
  webpackDevConfig.watch = true;
  webpack(webpackDevConfig, function(err, stats) {
    if (err) {
      gutil.log("webpack:" + err);
      return false;
    }
    gutil.log('[webpack:build]', stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }));
  })
})

gulp.task('default', [
  'clean', 'release'
], function(callback) {
  callback();
})

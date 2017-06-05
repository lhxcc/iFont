
'use strict';

const fs = require('fs');
const path = require('path');

const tempPath = path.resolve(__dirname, '../');

/**
 * webpack 生成 manifest 插件
 * @param filename 生成的 manifest 文件名
 * @param gutil 生成的 manifest 文件名
 */
function ManifestWebpackPlugin(filename, gutil) {
  this.filename = filename;
  this.gutil = gutil;
}

/**
 * 插件 apply 入口
 * @param  compiler [description]
 */
ManifestWebpackPlugin.prototype.apply = function apply(compiler) {
  const that = this;
  compiler.plugin('emit', (compilation, callback) => {
    const obj = {};
    const chunks = compilation.chunks;
    chunks.forEach((item/* , idx */) => {
      const files = item.files;
      for (let i = 0; i < files.length; i += 1) {
        if (/.js$/i.test(files[i])) {
          if (fs.existsSync(path.resolve(tempPath, `${item.name}.jsx`))) {
            obj[`${item.name}.jsx`] = files[i];
          } else {
            obj[`${item.name}.js`] = files[i];
          }
        } else if (/.css$/i.test(files[i])) {
          if (fs.existsSync(path.resolve(tempPath, `${item.name}.less`))) {
            obj[`${item.name}.less`] = files[i];
          } else if (fs.existsSync(path.resolve(tempPath, `${item.name}.scss`))) {
            obj[`${item.name}.scss`] = files[i];
          } else {
            obj[`${item.name}.css`] = files[i];
          }
        }
      }
    });
    const manifestPath = path.dirname(that.filename);
    fs.mkdir(manifestPath, 0o755, () => {
      that.gutil.log('create webpack-manifest file...');
      fs.writeFile(path.resolve(that.filename), JSON.stringify(obj, null, 2), (e) => {
        if (e) throw e;
      });
    });

    callback();
  });
};

/**
 * 导出插件类
 * @type {ManifestWebpackPlugin}
 */
module.exports = ManifestWebpackPlugin;

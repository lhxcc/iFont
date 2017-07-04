/**
 * Created by feichenxi on 16/4/15.
 *
 * config for production.
 * to take effect when $NODE_ENV=production.
 *
 */

'use strict';

const path = require('path');

const root = process.cwd(); // 进程运行当前目录

module.exports = {
  // 应用
  // 应用
  app: 'ys-iFont',
  configPath: __filename,
  server: {
    // 运行端口，必要，无默认值
    port: 3500,
  },

  // 日志配置
  log: {
    // 默认为工作目录下 logs
    dir: path.join(root, 'logs'),

    // 默认 info
    level: 'debug',
  },
  fileCfg: {
    inputDir: 'D:\\nodejs项目\\testInput',
    outputDir: 'D:\\nodejs项目\\testOutput',
  },
};

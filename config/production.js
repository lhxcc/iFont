/**
 *  Created by yaoguofeng on 2017/08/09.
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
  mysql: {
    database: 'fed',
    host: '10.82.3.136',
    username: 'civil',
    password: '123',
    port: 3306
  },
  fileCfg: {
    downloadDir: 'build/download'
  }
};

/**
 * Created by yaoguofeng on 2017/08/09.
 *
 * default config.
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
  // 图片服务器配置
  mysql: {
    database: 'fed',
    host: '10.82.3.136',
    username: 'civil',
    password: '123',
    port: 3306
  }
  //sequelize-auto -h "10.82.3.136" -p 3306 -d "fed" -u "civil" -x "123" --dialect "mysql" -o "./lib/models"
};

/**
 * Created by feichenxi on 2016/7/11.
 *
 * default config.
 *
 */

'use strict';

const path = require('path');

const root = process.cwd(); // 进程运行当前目录

module.exports = {
  // 应用
  app: 'ys-data-server',
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
    /*inputDir: 'http://127.0.0.1:3500/test',*/
    outputDir: 'D:\\nodejs项目\\testOutput',
  },
  //sequelize-auto -h "10.80.24.2" -p 3306 -d "data_management" -u "root" -x "88075998" --dialect "mysql" -o "./lib/models"
};

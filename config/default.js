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
    outputDir: 'D:\\nodejs项目\\testOutput',
  },
  // 图片服务器配置
  fastdfs: {
    uploadLimitByIp: 100,
    uploadDir: 'upload',
    uploadUrl: 'http://10.97.124.11:8080/file/transmission',
    DownloadUrl: 'http://pbimg.ys7.com',
  },
  //sequelize-auto -h "10.80.24.2" -p 3306 -d "data_management" -u "root" -x "88075998" --dialect "mysql" -o "./lib/models"
};

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

  // 调试模式，决定错误详细信息是否暴露给调用方，默认 false
  debug: true,

  // 是否开启模板缓存，默认开启 true
  templateCache: false,

  // 静态文件路径映射表缓存时间，单位分钟min，0min为不缓存
  staticMapCacheTime: 0,

  // 静态资源前缀
  dist: {
    server: '',
    prefix: '/',
  },

  // mysql 数据库配置
  mysql: {
    database: 'data_management',
    host: '10.80.24.2',
    username: 'root',
    password: '88075998',
    port: 3306,
  },
  hdfs: {
    host: '10.80.24.4',
    port: 14000,
    directoryPath: '/user/oozie/etl',
    jobTracker: 'cdh02:8032',//yarn地址
    nameNode: 'hdfs://cdh14:8020',//hdfs地址
    spark_main_class: 'ezviz.bigdata.action.ETLMain',//spark job入口类
    spark_master:'spark://cdh02:7077',//spark集群地址
    executor_memory: '10G',//任务执行的内存
    cores_max:100,//任务执行的最大CPU数
    jar_path: '/lib/DataTidy-1.0-SNAPSHOT.jar', //执行的spark job的jar地址
  },
  taskServer: {
    host: '10.80.24.2',
    port: 11000,
  },
};

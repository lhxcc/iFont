/**
 * Created by feichenxi on 2016/5/16.
 */

'use strict';

const log = require('../common/log').getLogger('sequelize');
const Sequelize = require('sequelize');
const config = require('config');

// 配置默认支持事务
const cls = require('continuation-local-storage');
Sequelize.cls = cls.createNamespace('koa-sequelize-transaction-namespace');

// 检查配置
if(!config.has('mysql.database')
    || !config.has('mysql.username')
    || !config.has('mysql.password')
    || !config.has('mysql.host')
    || !config.has('mysql.port')
){
    throw new Error('mysql config error!');
}

/**
 * 新建 Sequelize 对象
 * @type {*|exports|module.exports}
 */
const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.username'),
    config.get('mysql.password'),
    {
        dialect: 'mysql',
        host: config.get('mysql.host'),
        port: config.get('mysql.port'),
        pool: {
            maxConnections: 5
        },
        define: {
            timestamps: false,   // 默认不启用时间戳设定
            underscored: true    // 将驼峰命名转为下划线命名
        },
        timezone: '+08:00',      // 时区设置
        logging: log.debug,
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
    }
);
module.exports = sequelize;

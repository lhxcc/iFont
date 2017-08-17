/**
 * Created by yaoguofeng on 2017/08/16.
 */

'use strict';

const path = require('path');
const sequelize = require('../common/sequelize');

/**
 * 加载model
 * @param name
 * @returns {*}
 */
function load(name) {
    return sequelize.import(path.join(__dirname, name));
}

module.exports = {
    sequelize: sequelize,
    IconInfo: load('icon_info')
};

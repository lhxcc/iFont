'use strict';

const uuid = require('uuid');

/**
 * 获取一个随机UUID
 * @returns {XML|*|string|void}
 * @public
 */
module.exports.UUID = () => uuid.v4().replace(/-/g, '');

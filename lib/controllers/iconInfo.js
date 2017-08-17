/**
 * Created by yaoguofeng on 2017/08/16.
 */

'use strict';

const iconInfoApi = require('../services/icon_info_api');

/**
 *
 * @param parentId
 */
exports.list = async(ctx) => {
  ctx.status = 200;
  ctx.body = await iconInfoApi.list(ctx);
};

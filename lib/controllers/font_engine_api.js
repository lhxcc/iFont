/**
 * Created by yaoguofeng on 2017/08/09.
 */

'use strict';

const log = require('../common/log').getLogger(__filename);

const fontEngineApi = require('../services/font_engine_api');

/**
 *
 * @param parentId
 */
exports.fontDownload = async(ctx) => {
  ctx.status = 200;
  ctx.body = await fontEngineApi.fontDownload(ctx);
};

/**
 * Created by jizaiyi on 17/1/16.
 */

'use strict';

const log = require('../common/log').getLogger(__filename);

const sourceInfoService = require('../services/source_info_api');

/**
 *
 * @param parentId
 */
exports.fontIconCreate = async(ctx) => {
  ctx.status = 200;
  ctx.body = await sourceInfoService.fontIconCreate(ctx);
};

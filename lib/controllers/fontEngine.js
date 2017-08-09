/**
 * Created by yaoguofeng on 2017/08/09.
 */

'use strict';

const log = require('../common/log').getLogger(__filename);

const fontEngine = require('../services/fontEngine');

/**
 *
 * @param parentId
 */
exports.fontIconCreate = async(ctx) => {
  ctx.status = 200;
  ctx.body = await fontEngine.fontIconCreate(ctx);
};

/**
 * Created by jizaiyi on 17/1/16.
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

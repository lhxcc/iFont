/**
 * Created by jizaiyi on 17/1/16.
 */

'use strict';

const log = require('../common/log').getLogger(__filename);

exports.homeIndex = async(ctx) => {
  await ctx.render('pages/home/index', {
    title: '首页',
    version: process.version,
    time: new Date()
  });
};

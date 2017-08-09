/**
 * Created by yaoguofeng on 2017/08/09.
 */

'use strict';

const log = require('../common/log').getLogger(__filename);

exports.homeIndex = async(ctx) => {
  await ctx.render('index', {
    title: '首页',
    version: process.version,
    time: new Date()
  });
};

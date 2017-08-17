/**
 * Created by yaoguofeng on 2017/2/9.
 */
'use strict';

const log = require('../common/log').getLogger(__filename);
const RET = require('../common/ret');
const CODE = require('../common/code').CODE;
const IconInfo = require('../models').IconInfo;
/**
 * list： 分页获取iconfont列表
 * @param  type 类型
 * @param  offset 分页偏移数
 * @param  limit 分页数
 */
exports.list = async (ctx) => {
  try{
    let opt = {
      where:{
        type:Number(ctx.request.body.type),
      },
      limit: Number(ctx.request.body.limit),
      offset: Number(ctx.request.body.offset) * Number(ctx.request.body.limit),
      order: 'create_time DESC'
    };
    let count = await IconInfo.count({ where:{ type:Number(ctx.request.body.type)}} );
    let data = {
      total: count
    };
    data.result = await IconInfo.findAll(opt);
    return new RET(CODE.SUCCESS, data);
  }catch(e){
    log.error(e);
    return new RET(CODE.DATABASE_EEOR);
  }
}

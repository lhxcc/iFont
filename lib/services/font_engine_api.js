/**
 * Created by yaoguofeng on 2017/2/9.
 */
'use strict';
const log = require('../common/log').getLogger(__filename);
const RET = require('../common/ret');
const CODE = require('../common/code').CODE;
const fg = require('./fontGenerate');
const IconInfo = require('../models').IconInfo;

// 创建svg字体
exports.fontDownload = async (ctx) => {
  try{
    const idList = JSON.parse(ctx.request.body.idList);
    const downList =[];
    for(let i in idList) {
      let itemInfo = await IconInfo.findOne({
        where: {
          id: idList[i].id
        }
      });
      downList.push(itemInfo.dataValues);
    }
    const ret = await new Promise(function(resolve, reject){
      fg.generateFont(downList, function (err, file) {
        if (err) {
          throw err;
          reject(-1);
        }
        if(file){
          resolve(file);
        }else{
          reject(-1);
        }
      })
    });
    if( ret != -1){
      let data = {
        file: ret
      };
      return new RET(CODE.SUCCESS, data);
    } else {
      return new RET(CODE.DATABASE_EEOR);
    }
  }catch(e){
    log.error(e);
    return new RET(CODE.DATABASE_EEOR);
  }
};

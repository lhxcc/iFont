/**
 * Created by yaoguofeng on 2017/2/9.
 */
'use strict';
const log = require('../common/log').getLogger(__filename);
const RET = require('../common/ret');
const CODE = require('../common/code').CODE;
const fg = require('./lib/fontGenerate');
const config = require('config');
const path = require('path');
const fs = require('fs');
const UTIL = require('../common/util');
// 判断上传文件临时存放文件夹是否存在，不存在则创建此文件夹
let downloadDir = path.join(__dirname, `../../${config.fileCfg.downloadDir}`);
if(!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

// 创建svg字体
exports.fontDownload = async (ctx) => {
  try{
    const downList = ctx.request.body.downList;
    const newDownloadDir = `ifont_${UTIL.UUID()}`;
    const outputDir = `${downloadDir}/${newDownloadDir}`;
    fs.mkdirSync(outputDir);
    const ret = await new Promise(function(resolve, reject){
      fg.generateFont(downList, outputDir, function (err, file) {
        if (err) {
          throw err;
          reject(-1);
        }
        if(file){
          resolve(0);
        }else{
          reject(-1);
        }
      })
    })
    if( ret == 0){
      let data = {
        newDownloadDir: newDownloadDir,
        files: ['eot','html','svg','ttf','woff','woff2','css']
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

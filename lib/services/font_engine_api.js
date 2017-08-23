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
const zip = require("node-native-zip");

// 判断上传文件临时存放文件夹是否存在，不存在则创建此文件夹
let downloadDir = path.join(__dirname, `../../${config.fileCfg.downloadDir}`);
if(!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}
//检测文件或者文件夹存在 nodeJS
const fsExistsSync = (path) => {
  try{
    fs.accessSync(path,fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
};
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

      const list = [
        { name: `${newDownloadDir}/iconfont.html` , path: `${outputDir}/iconfont.html`},
        { name: `${newDownloadDir}/iconfont.css` , path: `${outputDir}/iconfont.css`},
        { name: `${newDownloadDir}/iconfont.svg` , path: `${outputDir}/iconfont.svg`},
        { name: `${newDownloadDir}/iconfont.ttf` , path: `${outputDir}/iconfont.ttf`},
        { name: `${newDownloadDir}/iconfont.eot` , path: `${outputDir}/iconfont.eot`},
        { name: `${newDownloadDir}/iconfont.woff` , path: `${outputDir}/iconfont.woff`},
        { name: `${newDownloadDir}/iconfont.woff2` , path: `${outputDir}/iconfont.woff2`}
      ];

      const archive = new zip();
      setTimeout(() => {
        archive.addFiles(list, function (err) {
          if (err) return console.log("err while adding files", err);
          var buff = archive.toBuffer();
          fs.writeFile(`${outputDir}/example.zip`, buff, function () {});
        });
      },1000);
      let data = {
        file: `/download/${newDownloadDir}/example.zip`
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

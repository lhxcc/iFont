/**
 * Created by yaoguofeng on 2017/2/9.
 */
'use strict';
const log = require('../common/log').getLogger(__filename);
const RET = require('../common/ret');
const CODE = require('../common/code').CODE;
const fg = require('./lib/fontGenerate');
const config = require('config');

// 创建svg字体
exports.fontIconCreate = async (ctx) => {
  try{
    const inputDir = config.fileCfg.inputDir;
    const outputDir = config.fileCfg.outputDir;
    fg.generateFont(inputDir, outputDir, function (err) {
      if (err) {
        log.info('Error: ' + err);
        return;
      }
    });
  }catch(e){
    log.error(e);
    return new RET(CODE.DATABASE_EEOR);
  }
};


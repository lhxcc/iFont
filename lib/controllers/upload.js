/**
 * Created by feichenxi on 2016/2/2.
 */
'use strict';

const log = require('../common/log').getLogger(__filename);
const config = require('config');
const redis = require('../utils/redis');

const path = require('path');
const uploadService = require('../services/upload');
const RET = require('../common/ret');
const CODE = require('../common/code').CODE;
const fs = require('fs');
const parse = require('co-busboy');
const request = require('request');
const util = require('../common/util');

const UPLOAD_LIMIT_PREFIX = 'openweb_upload_ip_';
const UPLOAD_LIMIT_EXPIRE = 60;
const ROOTPATH = path.join(__dirname, '../..');

// 判断上传文件临时存放文件夹是否存在，不存在则创建此文件夹
let uploadDir = path.join(ROOTPATH, config.fastdfs.uploadDir);
if(!fs.existsSync(uploadDir)){
  log.info('upload directory not found. create upload directory.');
  fs.mkdirSync(uploadDir);
}


// 上传图片 限制后缀名为 jpg jpeg png bmp
exports.uploadImage = function* uploadImage () {
  if (!this.request.is('multipart/*')) return new RET(CODE.UPLOAD_ERROR);
  let ext = '';
  let parts = parse(this, {
    checkFile: function (fieldname, file, filename) {
      ext = path.extname(filename);
      ext = ext.toLowerCase();
      log.info(ext);
      if(!/^.(jpg|jpeg|png|bmp|gif|svg)$/.test(ext)){
        let err = new Error('invalid image. input extname is ' + ext);
        err.status = 400;
        return err;
      }
    },
    autoFields: true
  });

  let part;
  let fileName = util.UUID();
  let tempFileName = path.join(ROOTPATH, config.fastdfs.uploadDir, fileName);
  let writer = fs.createWriteStream(tempFileName);

  try{
    while (part = yield parts) {
      // it's a stream
      part.pipe(writer);
    }
  }catch(e){
    log.info(e);
    // 删除临时文件
    fs.unlink(tempFileName, function(err){
        if(err){
          log.warn('删除文件失败:' + err + ' filename=>' + tempFileName);
        }
      log.debug('删除临时文件=>' + tempFileName);
    });
    this.status = 400;
    this.body = new RET(CODE.IMAGE_TYPE_ERROR);
    return;
  }
  // 写入流触发finish后再继续
  yield new Promise(function(resolve, reject){
    writer.on('finish', function(){
        resolve();
    });
  });

  // 文件大小不能超过2048KB
  let tempStates = fs.statSync(tempFileName);
  if(tempStates.size/1024 > 2048){
    return this.body = new RET(CODE.UPLOAD_FILE_SIZE);
  }

  fs.renameSync(tempFileName, tempFileName + ext);
  log.info(tempFileName + ext);
  this.body = yield uploadService.upload(tempFileName + ext);
  this.type = 'text/plain; charset=utf-8';
};



/**
 * 上传图片 用于人脸识别 无需登录
 */
exports.uploadFace = function* uploadFace(){
  let ip = this.get('X-Real-IP');
  log.info(ip + ' 上传人脸图片');
  // 判断在60s内相同ip调用上传接口次数是否大于config.uploadLimitByIp.uploadLimitByIp
  let count = yield redis.get(UPLOAD_LIMIT_PREFIX + ip) || 0;
  if(count > config.uploadLimitByIp.uploadLimitByIp) {
    log.warn(ip + ' 调用上传接口超过限制');
      return this.body = new RET(CODE.UPLOAD_LIMIT);
  } else {
      count++;
      redis.set(UPLOAD_LIMIT_PREFIX + ip, count, 'EX', UPLOAD_LIMIT_EXPIRE);
  }

  let param = this.request.body;
  if(param.cover && param.cover && typeof param.cover === 'string'){
    let str = param.cover;
    let base64Data = str.replace(/^data:image\/\w+;base64,/,"");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let fileName = util.UUID();
    let tempFileName = path.join(ROOTPATH, config.uploadDir.uploadDir, fileName);
    let arr = str.match(/^data:image\/(\w+);base64,/);
    if(arr && arr[1]){
      let ext = arr[1];
      if(/^(jpg|jpeg|png|bmp|gif)$/.test(ext)){
        ext = '.' + ext;
        let ret = yield new Promise(function(resolve, reject){
            fs.writeFile(tempFileName + ext, dataBuffer, function(err) {
                if(err){
                  log.info(err);
                    reject( new RET(CODE.IMAGE_TYPE_ERROR));
                }
                resolve();
            });
        });
        if(ret){
            this.body = ret;
        }
        this.body = yield uploadService.upload(tempFileName + ext);
      }else{
        log.info('输入参数未通过验证');
        this.body = new RET(CODE.IMAGE_TYPE_ERROR);
      }
    }else{
      log.info('输入参数未通过验证');
      this.body = new RET(CODE.PARAM_ERROR);
    }
  }else{
    log.info('输入参数未通过验证');
    this.body = new RET(CODE.PARAM_ERROR);
  }
};
// 上传文件，不限制类型
// 注意权限验证
exports.uploadFile = function* uploadFile() {
  log.info('接口调用 => uploadFile');
  if (!this.request.is('multipart/*')) return new RET(-1);
  let parts = parse(this, {
    autoFields: true
  });

  let part;
  let tempFileName = path.join(ROOTPATH, config.uploadDir.uploadDir, 'admin' + '_' + Date.now());
  let writer = fs.createWriteStream(tempFileName);
  while (part = yield parts) {
    // it's a stream
    part.pipe(writer);
  }

  this.body = yield uploadService.upload(tempFileName);
};


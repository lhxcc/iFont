/**
 * 上传服务，fastdfs接入实现
 */

'use strict';

const logger = require('../utils/logger')(__filename);
const conf = require('../config').conf;
const ROOTPATH = conf.ROOTPATH;
const RET = require('../common/ret');
const CODE = require('../common/code').CODE;
const fs = require('fs');
const path = require('path');
const request = require('request');
const helpers = require('../utils/helpers');
const ERR = require('../error').ERR;


// 本地文件上传到fastdfs
exports.upload = function* (filename) {
    let reader = fs.createReadStream(filename);
    reader.on('error', function(e){
        logger.error(e);
    });
    let formData = {
        file: reader
    };
    let ret = yield new Promise(function(resolve, reject){
        request.post({url:conf.fastdfsUploadUrl, formData: formData}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                logger.error('upload failed:', err);
                reject(-1);
                return;
            }
            logger.info('Upload...Server responded with:', body);
            if(body){
                resolve(body);
            }else{
                reject(-1);
            }
            return;
        });
    });
    
    // 删除临时文件
    fs.unlink(filename, function(err){
        if(err){
            logger.warn('delete temp file error:' + err + ' filename=>' + filename);
            return;
        }
        logger.debug('delete temp file=>' + filename);
    });

    if(ret === -1){
        return new RET(CODE.UPLOAD_ERROR);
    }else{
        return new RET(CODE.SUCCESS, conf.fastdfsDownloadUrl + '/' + ret);
    }


};

// 下载URL到本地
exports.downloadToLocal = function* (url){
    var extname = path.extname(url);
    let fileName = helpers.UUID() + extname;
    let tempFileName = path.join(ROOTPATH, conf.uploadDir, fileName);
    let writer = fs.createWriteStream(tempFileName);
    yield new Promise(function(resolve, reject){
        request(url).pipe(writer);
        writer.on('finish', function(){
            logger.info(url + ' download finished.');
            resolve();
        });
    });
    return tempFileName;
};

// 上传到fastdfs 返回地址
exports.uploadToFastdfs = function * (filename){
    let reader = fs.createReadStream(filename);
    reader.on('error', function(e){
        logger.error(e);
    });
    let formData = {
        file: reader
    };
    let ret = yield new Promise(function(resolve, reject){
        request.post({url:conf.fastdfsUploadUrl, formData: formData}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                throw err;
            }
            logger.info('Upload...Server responded with:', body);
            if(body){
                resolve(body);
            }else{
                throw new Error(CODE.UPLOAD_ERROR, '上传fastdfs返回body为空');
            }
            return;
        });
    });

    return conf.fastdfsDownloadUrl + '/' + ret;

};

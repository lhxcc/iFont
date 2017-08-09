/**
 * Created by jizaiyi on 16/6/2.
 * 错误处理
 */
'use strict';

const logger = require('./log.js').getLogger(__filename);
const Sequelize = require('sequelize');
const RET = require('./ret.js');
const CODE = require('./code.js').CODE;


/**
 * 扩展Error 增加code属性
 */
class ERROR extends Error {
    constructor(code, msg){
        super(msg);
        this.code = code;
    }
}
/**
 * 对外方法:返回ERROR对象
 */
//exports.ERR = function(code, msg){
//    return new ERROR(code, msg);
//};

const SPLITSIGN = '--';
/**
 * 返回基本错误对象
 * @param code
 * @param msg
 * @returns {Error|error.BaseError}
 * @constructor
 */
exports.ERR = function(code, msg){
    return new Error([code, msg].join(SPLITSIGN));
};


/**
 * 错误处理
 * @param e
 */
function * errorHandler(e){
    if(e instanceof Sequelize.Error){
        logger.error('Sequelize.Error=>' + e.message);
        return this.body = new RET(CODE.DATABASE_EEOR);
    }
    if(!e.message){
        return this.body = new RET(CODE.UNKNOWN);
    }
    let signIndex = e.message.indexOf(SPLITSIGN);
    let code,message;
    if(signIndex > -1){
        code = Number(e.message.substr(0, signIndex));
        message = e.message.substr(signIndex + SPLITSIGN.length) || '未知错误';
    }else{
        code = CODE.ERROR;
        message = '未知错误';
    }
    switch(code){
        // 参数错误处理
        case CODE.PARAM_ERROR:
            this.body = new RET(code).setMsg(message || '参数校验出错,请修改参数');
            break;
        // 参数校验规则错误
        case CODE.PARAM_RULE_ERROR:
            this.body = new RET(code);
            break;
        case CODE.NOT_FOUND:
            logger.warn(e.message + ' url=>' + this.url);
            this.redirect('/');
            break;
        case CODE.DEVICE_ADDRESS_NOT_FOUND:
            this.body = new RET(code);
            break;
        // 默认错误处理:返回JSON形式的错误信息
        default:
            logger.error(e);
            this.body = new RET(code, message);
            break;
    }
}

exports.handler = function(){
    return function * (next){
        try{
            yield next;
        }catch(e){
            yield errorHandler.call(this, e);
        }
    }
};

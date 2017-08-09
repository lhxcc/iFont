/**
 * Created by feichenxi on 2017/1/24.
 */

'use strict';

const KoaRouter = require('koa-router');
const admin = require('../controllers/admin');
const fontEngine = require('../controllers/fontEngine');

const web = module.exports.web = new KoaRouter();
const api = module.exports.api = new KoaRouter();

/**
 * 页面路由
 */
web.get('/', admin.homeIndex);


// 内部调用接口
api.post('/fontIconCreate', fontEngine.fontIconCreate);

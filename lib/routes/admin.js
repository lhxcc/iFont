/**
 * Created by feichenxi on 2017/1/24.
 */

'use strict';

const KoaRouter = require('koa-router');
const admin = require('../controllers/admin');
const fontEngine = require('../controllers/fontEngine');
/*const upload = require('../controllers/upload');*/

const web = module.exports.web = new KoaRouter();
const api = module.exports.api = new KoaRouter();

/**
 * 页面路由
 */
web.get('/index', admin.homeIndex);


// 内部调用接口
api.post('/fontIconCreate', fontEngine.fontIconCreate);
/*api.post('/uploadFile', upload.uploadFile);
api.post('/upload', upload.uploadImage);
api.post('/uploadFace', upload.uploadFace);*/


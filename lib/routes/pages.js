/**
 * Created by yaoguofeng on 2017/08/09.
 */

'use strict';

const KoaRouter = require('koa-router');
const pages = require('../controllers/pages');
const fontEngine = require('../controllers/font_engine_api');
const iconInfo = require('../controllers/iconInfo');

const web = module.exports.web = new KoaRouter();
const api = module.exports.api = new KoaRouter();

/**
 * 页面路由
 */
web.get('/', pages.homeIndex);


// 内部调用接口
api.post('/iconList', iconInfo.list);

api.post('/font/download', fontEngine.fontDownload);

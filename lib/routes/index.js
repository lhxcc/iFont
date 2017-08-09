/**
 * Created by yaoguofeng on 2017/08/09.
 */

'use strict';

const log = require('../common/log').getLogger(__filename);

const config = require('config');
const KoaRouter = require('koa-router');

const apiRouter = new KoaRouter();
const webRouter = new KoaRouter();
const rootRouter = new KoaRouter();

const RET = require('../common/ret');
const CODE = require('../common/code').CODE;

/**
 * 接口错误处理
 */
apiRouter.use(async(ctx, next) => {
    // log.debug('to catch api error.')
    try {
        return await next();
    } catch (err) {
        const context = ctx;
        log.error('route api error.\n', err.stack);
        context.status = 500;
        if (config.has('debug') && config.get('debug')) {
            return (context.body = new RET(CODE.ERROR, err.stack));
        }
        return (context.body = new RET(CODE.ERROR, 'Internal Server Error'));
    }
});

/**
 * 页面错误处理
 */
webRouter.use(async(ctx, next) => {
    // log.debug('to catch web error.')
    try {
        return await next();
    } catch (err) {
        const context = ctx;
        log.error('route web error.\n', err.stack);
        context.status = 500;
        return context.render('error', {
            message: 'Internal Server Error!',
            error: (config.has('debug') && config.get('debug')) ? err : null,
        });
    }
});

//----------
// custom routes begin
//----------

/**
 * import routes
 */
const pagesRouter = require('./pages');

/**
 * use rest api routes
 */
apiRouter.use(pagesRouter.api.routes(), pagesRouter.api.allowedMethods());

/**
 * use web pageroutes
 */
webRouter.use(pagesRouter.web.routes(), pagesRouter.web.allowedMethods());

//----------
// custom routes end
//----------

/**
 * 挂载到根路由
 */
rootRouter.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
rootRouter.use(webRouter.routes(), webRouter.allowedMethods());

/**
 * 导出根路由
 */
module.exports.router = rootRouter;

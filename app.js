/**
 * Created by feichenxi on 2016/7/11.
 *
 * environment variable:
 * the port: $PORT=3500
 * the config dir: $NODE_CONFIG_DIR=./config
 *
 */

'use strict';

// require core modules
const path = require('path');

// require thirdpart modules
const config = require('config');
const Koa = require('koa');
const koaStatic = require('koa-static');
const hbs = require('koa-hbs');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');

// require custom modules
const log = require('./lib/common/log');

const app = new Koa();
const logger = log.getLogger(__filename);

const staticPath = path.join(__dirname, 'build');
const viewPath = path.join(__dirname, 'build/views');

// set app name
app.name = config.has('app') ? config.get('app') : 'server';

// global middlewares
app.use(koaStatic(staticPath, {
  maxage: 100 * 365 * 24 * 60 * 60,
}));
app.use(log.getConnect());
app.use(hbs.middleware({
  viewPath
}));
app.use(json(null));
app.use(bodyparser({
  onerror: function onerror(err, ctx) {
    ctx.throw('body parse error', 422);
  },
}));

// Sessions
app.keys = ['ys-data-server-session-secret'];

// mount root routes
const router = require('./lib/routes').router;

app.use(router.routes());

// Not Found 404
app.use(async (ctx) => {
  const context = ctx;
  context.status = 404;
  if (context.request.method.toUpperCase() === 'GET') {
    await context.render('404');
  } else {
    context.body = 'Not Found';
  }
});

// error
app.on('error', (err, ctx) => {
  logger.error('server error.\n', err.stack, '\ncontext: ', JSON.stringify(ctx));
});

module.exports.app = app;

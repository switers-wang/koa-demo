const Koa = require('koa');
const Route = require('koa-route');
const app = new Koa();
const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}
const one = (ctx, next) => {
    console.log('>> one');
    next();
    console.log('<< one');
  }
  
  const two = (ctx, next) => {
    console.log('>> two');
    next(); 
    console.log('<< two');
  }
  
  const three = (ctx, next) => {
    console.log('>> three');
    next();
    console.log('<< three');
  }
const htmlPage = (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
}
const helloJson = (ctx) => {
    ctx.response.body = 'Hello World';
}
const corsTest = (ctx) => {
    console.log('ctx.request', ctx.request);
    const origin = ctx.request.origin;
    ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8082');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    ctx.response.body = 'Hello World';
    ctx.response.type = 'json';
    ctx.response.body = { 
        code: 200,
        data: {
            id: '2001324', 
            misName: 'wangxupeng'
        }
    };
}
app.use(Route.get('/', htmlPage));
app.use(Route.all('/midas/campaign/baseInfo/ajax/getUserInfoBySSO', corsTest));
app.use(logger);
app.listen(3000);
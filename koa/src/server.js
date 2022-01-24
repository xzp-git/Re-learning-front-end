// const Koa = require('../koa')
// const app = new Koa()

// // app.use((ctx) => {
// //   ctx.body = "Hello World"
// // })

// app.listen(3000,() => {
//   console.log('server start 3000');
// })

/**
 * koa默认就是对我们的node原生的http服务进行了封装
 * application.js整个的应用
 * context.js代表的是上下文
 * request.js用于扩展请求的
 * response.js用于扩展响应的
 */


 const Koa = require('../koa')
 const app = new Koa()

 app.use((ctx) => {
   if (ctx.path === '/get') {
     console.log(ctx.query);
     ctx.body = "Hello World get"
   }else if(ctx.path === '/post'){
     ctx.body = "Hello World post"
   }
   
 })
 app.listen(3000, () => {
   console.log('server start 3000')
 })

 /**
 const Koa = require('../koa')
 const app = new Koa()

  app.use((ctx,next) => {
    console.log("START 1");
    next()
    console.log("END 1");
    
    ctx.body = "<h1>Koa Middleware</h1>"
    console.log("响应结束");
  })
  app.use((ctx,next) => {
    console.log("START 2");
     next()
    console.log("END 2");
  })
  app.use((ctx,next) => {
    console.log("START 3");
     next()
    console.log("END 3");
  })
  app.use((ctx,next) => {
    console.log("START 4");
     next()
    console.log("END 4");
  })
 app.listen(3000, () => {
   console.log('server start 3000')
 }) 
 */
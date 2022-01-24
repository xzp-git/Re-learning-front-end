const http = require('http')
  const EventEmitter = require('events')
  const context = require('./context');
  const request = require('./request');
  const response = require('./response');
  class Application extends EventEmitter {
    constructor(){
      super()
      this.context = Object.create(context)
      this.request = Object.create(request)
      this.response = Object.create(response)
      this.middlewares = []
    }
    createContext(req, res){
      // req, res 是原生的  request 和 response 是我们自己扩展
      const ctx = Object.create(this.context)
      const request = Object.create(this.request)
      const response = Object.create(this.response)
      ctx.request = request 
      ctx.request.req = ctx.req = req

      ctx.response = response; 
      ctx.response.res = ctx.res = res;
      return ctx
    }
    use(middleware){
      this.middlewares.push(middleware)
    }
    compose(ctx){
      let index = -1
      const dispatch = (i) => {
        if(i <= index){
          return Promise.reject(new Error('next() called multiple times'))
        }
        index = i
        if(this.middlewares.length === i) return Promise.resolve()
        let middleware = this.middlewares[i]
        try{
          return Promise.resolve(middleware(ctx, () => dispatch(i+1))) //这里的() => dispatch(i+1) 代表我们的next函数也就是下一次中间件的执行
        }catch(e){
          return Promise.reject(e)
        }
      }
      return dispatch(0)
    }
    handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      res.statusCode = 404
      this.compose(ctx).then(() => {
        let body = ctx.body
        if(body){
          res.end(body)
        }else{
          res.end('Not Found')
        }
      }).catch(e => {
        this.emit('error', e)
      })
    }
    listen(){
      const server = http.createServer(this.handleRequest)
      server.listen(...arguments)
    }
  }

  module.exports = Application
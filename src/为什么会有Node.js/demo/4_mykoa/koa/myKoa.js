const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class MyKoa {
  // app.use 调用 app.use(callback)
  constructor() {
    this.middlewares = []
  }
  use(middleware) {
    this.middlewares.push(middleware)
    return this // 支持链式调用 app.use().use()
  }

  listen(...args) {
    console.log(args)
    const server = http.createServer(async (req, res) => {
      // 需要先创建上下文
      let ctx = this.createContext(req, res)
      
      // 组合函数、koa中间件核心
      let fn = this.compose(this.middlewares) // 合并为一个执行函数
      await fn(ctx)
      
      // ctx.body设置值后，并没有响应给前端，来简单写下响应的逻辑
      // 这里简单的处理了下ctx.body 但实际要有很多处理
      let bodyType = typeof ctx.body
      let result = bodyType === 'object' ? JSON.stringify(ctx.body) : ctx.body
      // 解决中文乱码的问题
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(result)
    })
    server.listen(...args)
  }

  createContext(req, res) {
    // 先继承一些我们写的对象
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res

    return ctx
  }

  compose(middlewares) {
    return function(ctx) {
      return dispatch(0) // 先执行第一个中间件
      // 定义一个函数
      function dispatch(i) { // 递归执行函数
        let middleware = middlewares[i]
        if (!middleware) { // 递归退出条件
          return Promise.resolve()
        }
        return Promise.resolve(
          middleware(ctx, () => {  // 对应 app.use(ctx, next => { await next() })
            // dispatch(i + 1)
            return dispatch(i + 1) // 如果不执行next，无法执行下一个中间件
          })
        )
      }
    }
  }
}

module.exports = MyKoa
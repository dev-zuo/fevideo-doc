const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

app.use(require('./allowCors'))

app.use((ctx, next) => {
  console.log(ctx.method)
  next()
})

// 路由
router.get('/users', ctx => {
  console.log(`接收到get请求${ctx.url}`)
  ctx.body = {
    user: 'zhangsan',
    age: 18
  }
})

router.post('/info', ctx => {
  console.log(`接收到post请求${ctx.url}`)
  ctx.body = { b: 1 }
})

router.put('/info', ctx => {
  console.log(`接收到post请求${ctx.url}`)
  ctx.body = { b: 1 }
})

router.get('/jsonpTest', ctx => {
  console.log(`接收到get请求${ctx.url}`)
  let resdata = {
    user: 'zhangsan'
  }
  let jsonpData = `${ctx.query.callback}(${JSON.stringify(resdata)})`
  console.log('ctx.query.callback', ctx.query.callback)
  console.log('jsonpData', jsonpData) // handleRes({"user":"zhangsan"})
  ctx.body = jsonpData
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(9000, () => console.log('服务已开启，端口 9000'))



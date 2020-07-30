const Koa = require('koa')
const Router = require('koa-router')
const multer = require('@koa/multer')
const app = new Koa()
const router = new Router()

app.use(require('koa-static')(__dirname + '/public')) // 静态服务
app.use(require('koa-bodyparser')()) // 解析

// 路由
router.get('/users', ctx => ctx.body = 'users')
router.post('/info', ctx => ctx.body = { b: 1 })

// 请求参数
router.get('/user', ctx => ctx.body = ctx.query)
router.post('/user', ctx => ctx.body = ctx.request.body)
router.post('/test', multer().none(), ctx => ctx.body = ctx.request.body) 

app.use(router.routes()).use(router.allowedMethods())

app.listen(9000, () => console.log('服务已开启，端口 9000'))

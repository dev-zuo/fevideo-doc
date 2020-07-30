
const Koa = require('koa')
const app= new Koa()
const intercept = require('./intercept_new')

let blacklist = [
  '127.0.0.1',
  '192.168.1.2'
]
// 请求拦截中间件
app.use(intercept(blacklist))

app.use((ctx, next) => {
  ctx.body = 'hello'
})

app.listen(3000)
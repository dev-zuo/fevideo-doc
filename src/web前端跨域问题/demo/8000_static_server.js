const Koa = require('koa')
const app = new Koa()

app.use(require('koa-static')(__dirname + '/public')) // 静态服务

app.listen(8000, () => console.log('服务已开启，端口 8000'))

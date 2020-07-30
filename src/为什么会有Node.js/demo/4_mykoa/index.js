const delay = (sec) => Promise.resolve(resolve => setTimeout(() => resolve(), sec))

const Koa = require('./koa/myKoa.js')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = '1'
  console.log('start 1')
  await next()
  console.log('end 1')
  ctx.body += '5'
})

app.use(async (ctx, next) => {
  ctx.body += '2'
  console.log('start 2')
  await delay(2000)
  await next()
  console.log('end 2')
  ctx.body += '4'
})

app.use(async (ctx, next) => {
  ctx.body += '3'
  console.log('start 3')
  await delay(2000)
  next()
  console.log('end 3')
}).use((ctx, next) => {
  // 试试链式调用
  console.log('start 4')
  ctx.body += 'end'
  console.log('end 4')
})

app.listen(3000)

// 访问网页内容为 123end45
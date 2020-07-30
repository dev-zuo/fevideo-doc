const express = require('express')
const multer = require('multer'); // multipart/form-data
const app = express()
app.use(express.static('public')) // 静态服务

// 路由
app.get('/users', (req, res) => res.json({a: 1}))
app.post('/info', (req, res) => res.json({b: 1}))

// post、get参数
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/user', (req, res) => res.json(req.query))
app.post('/user', (req, res) => res.json(req.body))
// 注意post请求头选择form-data会被请求头设置覆盖
app.post('/test', multer().none(), (req, res) => res.json(req.body)) 

app.use('/', (req, res) => res.send('404'))
app.listen(9000, () => console.log(`Example app listening on port 9000!`))
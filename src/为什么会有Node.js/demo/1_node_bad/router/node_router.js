// 利用fs，渲染静态html、JSON字符串返回
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=> {
  const { url, method } = req
  console.log('url, method: ', url, method)

  if (url === '/' && method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) throw err
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
      name: 'guoqzuo'
    }))
  } else if (url === '/info' && method === 'POST') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({b: 1}))
  } else {
    res.end('404')
  }
})


server.listen(9000, () => { console.log('端口开启于9000') })
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=> {
  const { url, method } = req
  console.log('url, method: ', url, method)

  let staticPath = './public'
  if (url === '/' && method === 'GET') {
    fs.readFile(staticPath + '/index.html', (err, data) => {
      if (err) throw err
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/test.png' && method === 'GET') {
    fs.readFile(staticPath + url, (err, data) => {
      if (err) throw err
      res.statusCode = 200
      res.setHeader('Content-Type', 'image/png')
      res.end(data)
    })
  } else {
    res.end('404')
  }
})
server.listen(9000, () => { console.log('端口开启于9000') })
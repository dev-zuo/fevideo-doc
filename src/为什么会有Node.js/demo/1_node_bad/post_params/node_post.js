const http = require('http')
const URL = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res)=> {
  const { url, method } = req
  console.log('url, method: ', url, method) // url, method:  /user?a=1&b=2 GET

  let urlObj = URL.parse(url) // 返回一个Url对象
  console.log(urlObj)
  let path = urlObj.pathname
  if (path === '/user' && method === 'GET') {
    // 加 true 的二参后，会将 Url对象的 query 属性
    // 由字符串 'a=1&b=2' 转换为对象 { a: '1', b: '2' }
    let query =  URL.parse(url, true).query
    res.end(JSON.stringify(query))
  } else if (path === '/user' && method === 'POST') {
    var postData = ''; // 接收POST请求数据
    // POST请求数据需要监听request的data事件来获取
    console.log(req.headers)
    req.on('data', function (chunk) {
      postData += chunk;
      console.log('接收到了数据', chunk)
    });
    // 在end事件触发后,将post_data解析为真正的POST请求格式，可以用.语法来获取值
    req.on('end', function(){
      // postData = querystring.parse(post_data);
      console.log(postData)
      let contentType = req.headers['content-type']
      switch(contentType) {
        case 'application/x-www-form-urlencoded':
          postData = querystring.parse(postData)
          // Object.fromEntries(new URLSearchParams(postData))
          break
        case 'application/json':
          postData = JSON.parse(postData)
          break
        default:
          if (contentType.startsWith('multipart/form-data')) {
            postData = postData.split('\r\n')
          }
      }
      console.log(typeof postData, postData)
      res.end('end')
    });
  }
})
server.listen(9000, () => { console.log('端口开启于9000') })


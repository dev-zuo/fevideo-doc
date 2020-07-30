function intercept(blacklist) {
  return async (ctx, next) => {
    // 获取当前IP
    function getClientIp(req) {
      let curIp = (
        req.headers['x-forwarded-for'] ||  // 是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress 
      )
      curIp.startsWith('::ffff:') && (curIp = curIp.split('::ffff:')[1])
      console.log('当前ip是', curIp)
      return curIp
    }

    let { res, req } = ctx
    const ip = getClientIp(req)
  
    if (blacklist.includes(ip)) {
      ctx.body = '您无权限访问'
      // 如果不执行next，就无法进入到下一个中间件
    } else {
      await next()
    }
  }
}

module.exports = intercept
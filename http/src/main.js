

const fs = require("fs").promises
const path = require("path")
const http = require("http")
const os = require('os')
const url = require('url')
const ejs = require('ejs');
const mime = require('mime');

const zlib = require('zlib');

const { createReadStream, readFileSync } = require('fs');
const chalk = require('chalk')


let interfaces = os.networkInterfaces()
interfaces = Object.values(interfaces).flat().filter(item => item.family === 'IPv4')

const template = readFileSync(path.resolve(__dirname, 'template.html'), 'utf8')






class Server{
  constructor(opts){
    this.port = opts.port
    this.directory = opts.directory
    this.template = template
  }
  handleRequest = async (req, res) => {
    //当请求到来时我需要判断 你的访问路径 是文件则显示文件的内容，如果是文件夹则显示文件夹中的列表 fs.stat fs.readdir
    let {pathname} = url.parse(req.url)

    //根据用户访问的路径生产一个绝对路径
    let absPath = path.join(this.directory, pathname)
    try {
      let statObj = await fs.stat(absPath)
      if (statObj.isFile()) {
        //将文件直接读取出来返回即可
        this.sendFile(absPath, req, res, statObj)
      }else{
        //我们需要 用目录的信息去渲染默认 返回给用户
        const dirs = await fs.readdir(absPath)
        let template = ejs.render(this.template,{
          dirs:dirs.map(dir => {
            return {dir, href:path.join(pathname,dir)}
          })
        })
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(template)
      }
    } catch (error) {
      this.sendError(absPath, req, res)
    }
  }
  cache(absPath, req, res, statObj){
    /**
     * 在发送文件之前 我们可以给文件设置一个缓存的时间，如果没有超过缓存时间 那就直接用缓存就好了 不用每次都访问服务器
     * 强制缓存：让浏览器在某个时间内不在请求服务器了
     * res.setHeader('Expires', new Date(Date.now() + 2 * 1000).toGMTString())//http1.0中这种方式可以让引用的资源在某一段时间内不在发送请求了首次访问的页面不能走强制缓存。强制缓存不能让首次访问的内容缓存。如果用户更改了本地的时间拿自己的本地的时间和服务端返回的日期左对比 判断是否过期，会导致缓存失效
     * 在http1.1中可以使用 res.setHeader('Cache-Control', 'max-age=10') 相对时间 //no-store 压根没有缓存 no-cache有缓存只是不走
     * last-modified -> if-modified-since  最后一次修改的时间
     * etag -> if-none-match 文件的内容摘要
     * expires + cache-control
     * 1.第一次访问服务器我们可以采用强制缓存（浏览器不要再来找我了）10s + 最后修改时间
     * 2.10s内再次访问就不会发送请求了
     * 3.超过10s后会再次向服务器发送请求（会携带最后的修改时间），但是此时服务器会做对比缓存（拿服务器的文件和携带的内容作比较）如果时间一致认为这个文件没有修改 返回304
     * 4.浏览器会根据状态吗 走自己的缓存 过一会又超过十秒 再去走第二部
     * 如果在强制缓存的10s内访问资源，不会返回最新缓存的是旧的
     * 
     */
    //强制缓存 缓存时间取决于你自己
    //绝对时间
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString())
    // 相对时间
    res.setHeader('Cache-Control', 'max-age=10')
    //最后一次修改时间
    let lastModified = statObj.ctime.toGMTString()
    let eTag = new Date(lastModified).getTime().toString(16)+'-'+statObj.size.toString(16)

    res.setHeader('last-modified', lastModified)
    res.setHeader('ETag', eTag)
    let ifNoneMatch = req.headers['if-none-match']
    let ifModifiedSince = req.headers['if-modified-since']
    if (lastModified !== ifModifiedSince) {
      return false
    }
    if (ifNoneMatch !== eTag) {
      return false
    }
    return true

  }
  gzip(absPath, req, res, statObj){
    //压缩都是经过gzip？webpack 插件打包的时候实现gzip 我们不需要再次gzip
    let ecoding = req.headers['accept-encoding']
    if (ecoding.includes('gzip')) {
      //需要根据支持的压缩编码 进行压缩 并且返回
      //content-encoding 来表示如何压缩的
      res.setHeader('Content-Encoding', 'gzip') //告诉你这gzip压缩过
      return zlib.createGzip()
    }
  }
  sendFile(absPath, req, res, statObj){
    if (this.cache(absPath, req, res, statObj)) {
      res.statusCode = 304 //走协商缓存
      res.end()
    }
    //压缩， 我们不希望把文件整个发给客户端 服务端开启 gzip压缩可以降低文件传输大小
    //gzip 对重复性较高的内容进行替换 1111111... -> 15k1
    let createGzip = null
    res.setHeader('Content-Type', `${mime.getType(absPath) || 'text/plain'};charset=utf-8`)
    if (createGzip = this.gzip(absPath, req, res, statObj)) {
      createReadStream(absPath).pipe(createGzip).pipe(res)
    }else{
      createReadStream(absPath).pipe(res);
    }
  }
  sendError(absPath, req, res) {
      res.statusCode = 404;
      res.end(`Not Found`)
  }
  start(){
    let server = http.createServer(this.handleRequest)
    server.listen(this.port, () => {
      console.log(
                chalk.yellow(`Starting up http-server, serving ${chalk.green(path.relative(process.cwd(),this.directory) || './')}  \r\nAvailable on:`)
            )
      interfaces.forEach(item => {
        console.log(
          `  http://${item.address}:${chalk.green(this.port)}`
        );
      });
      console.log(`Hit CTRL-C to stop the server`)
    })
  }
}

module.exports = Server
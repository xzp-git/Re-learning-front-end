const EventEmitter = require('events')
const fs = require('fs')
class ReadStream extends EventEmitter{
  constructor(path, options = {}){
    super()
    //我们先要将用户传递的属性放在实列上 目的就是保证后续扩展的方法都能直接使用这些参数
    this.flags = options.flags || 'r'
    this.start = options.start || 0
    this.end = options.end // 没有end就是undefined
    this.encoding = options.encoding || null
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.autoClose = options.autoClose || true
    this.emitClose = options.emitClose || true
    this.path = path

    this.flowing = false //默认是非流动模式

    this.on('newListener', (type) => {
      if (type === 'data') { //用户监听了data事件
        this.flowing = true
        this.read()
      }
    })

    this.offset = this.start //offset每次读取的是偏移量
    this.open() //直接打开文件
  }
  destroy(err){
    if(err) this.emit('error', err)
    if (typeof this.fd === 'number') {
      fs.close(this.fd, () => this.emit('close'))
    }
  }
  open(){
    fs.open(this.path, this.flags, (err, fd) => {
      if(err){
        return this.destroy(err)
      }
      this.fd = fd //异步的
      this.emit('open', fd)
    })
  }
  pause(){
    this.flowing = false
  }
  resume(){
    if (!this.flowing) {
      this.flowing = true
      console.log();
      this.read()
    }
  }
  read(){
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }
    //每次读取的时候要产生一个新的内存空间
    //根据end 和 偏移量来计算当前要读取的个数
    let howMuchToRead = this.end ? Math.min((this.end - this.offset + 1), this.highWaterMark) : this.highWaterMark
    let buffer = Buffer.alloc(howMuchToRead)
    fs.read(this.fd, buffer, 0, howMuchToRead, this.offset, (err, bytesRead) => {
      if(err) return this.destroy(err)
      if (bytesRead == 0) { //如果没有读取到数据 说明读取完毕了
        this.emit('end')
        return this.destroy()
      }
      this.offset += bytesRead
      this.emit('data', buffer.slice(0, bytesRead))

      if (this.flowing) {
        this.read()
      }
    })
  }
  pipe(ws){
    this.on('data', (data) => {
      let flag = ws.write(data)
      if (!flag) {
        this.pause()
      }
    })
    ws.on('drain', ()=> {
      this.resume()
    })
    this.on('end', () => {
      ws.end()
    })
  }
}

module.exports = ReadStream
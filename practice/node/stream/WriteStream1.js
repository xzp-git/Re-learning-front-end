const EventEmitter = require('events')
const fs = require('fs')
const Queue = require('./Queue')

class WriteStream extends EventEmitter{
  constructor(path, options = {}){
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.highWaterMark = options.highWaterMark || 16 * 1024
    this.encoding = options.encoding || 'utf-8'
    this.autoClose = options.autoClose || true
    this.emitClose = options.emitClose || true
    this.open()
    this.len = 0
    this.needDrain = false
    this.writing = false
    this.cache = new Queue
    this.offset = 0
  }
  destroy(err){
    if (err) {
      this.emit('error', err)
    }
  }
  clearBuffer(){
    let o = this.cache.peak()
    if (o) {
      let {chunk, encoding, cb} = o.element
      this._write(chunk, encoding, cb)
    }else{
      if (this.needDrain) {
        //需要触发drain事件 就触发 并且这次再继续像文件中写入
        this.needDrain = false
        this.writing = false
        this.emit('drain')
      }
    }
  }
  open(){
    fs.open(this.path, this.flags, (err, fd) => {
      if(err) return this.destroy(err)
      this.fd = fd
      this.emit('open', this.fd)
    })
  }
  write(chunk, encoding = this.encoding, cb = () => {}){
    //需要返回一个值 调用write传递的参数和highWaterMark比较
    chunk = Buffer.isBuffer(chunk)? chunk :Buffer.from(chunk)

    this.len += chunk.length //维护长度
    this.needDrain = this.len >= this.highWaterMark
    const callback = () => {
        this.clearBuffer();
        cb()
    }
    if (this.writing) { //放到缓存中
      this.cache.add({
        chunk,
        encoding,
        cb:callback
      })
    }else{ //直接调用fs.write方法来进行写入即可
      this.writing = true
      this._write(chunk, encoding, callback)
    }
    return !this.needDrain
  }
  _write(chunk, encoding, cb){
    // console.log('用户立刻调用了write方法', this.fd);
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err,written) => {
      if(err) return this.destroy(err)
      this.len -= written //为了保证下一write可以真实的写入文件中
      this.offset += written
      cb()
    })
  }
  end(chunk = ''){
    this.write(chunk, 'utf-8',() => {
      console.log('文件关闭');
      fs.close(this.fd,() => {
        this.emit('close')
      })
    })
  }
}


module.exports = WriteStream;
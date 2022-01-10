const fs = require('fs');
const path = require('path')

const ReadStream = require('./ReadStream');
const WriteStream = require('./WriteStream1')


// let rs =  fs.createReadStream(path.resolve(__dirname, 'a.txt'), {
//   highWaterMark:4
// })

// let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {
//   highWaterMark:1
// })

// rs.pipe(ws) 



function pipe(source, target) {
  const rs = fs.createReadStream(source, {highWaterMark:4})
  const ws = fs.createWriteStream(target, {highWaterMark:4})
  rs.on('data', function (data) {
    let flag = ws.write(data)
    if(!flag) rs.pause() //监听读取  
  })
  ws.on('drain',function () {
    rs.resume() //恢复读取
  })
  //读取完毕后 会触发close事件
  rs.on('end',function () {
    ws.end() //结束了 关闭文件 = ws.write('end') + close
  })
}
pipe(path.resolve(__dirname, 'a.txt'), path.resolve(__dirname, 'b.txt'))
const fs = require('fs')
const path = require('path')

// fs.readFile(path.resolve(__dirname, '../../package.json'), (err,data) => {
//   if(err) return console.log(err)
//   fs.writeFile(path.resolve(__dirname, 'a.json'), data, ()=>{
//     console.log('ok');
//   })
// })

//readFile适合读取一些小的文件 js css html
// 视频 音频（如果采用readFile这总方式会淹没可用内存）
//边读边写  读一点写一点 我们可以控制读写的速率（流）

// fs.open() fs.read() fs.write() fs.close()

/**
 * fs.open()
 * flags 标识位 我打开文件要做什么事 'w' 写  'r' 读  'a' 追加
 * 如果在r的情况读取的文件不存在就会报错
 * fd文件描述符 用来代表我操作的哪个文件 以什么方式来操作
 * 读取其实就是写入 将文件中的内容写入到内存中 写入其实就是读取 需要将文件读取出来才能写入
 * node中默认认为64K就需要分片读取
 */

// let buf = Buffer.alloc(1) 
// fs.open(path.resolve(__dirname, '1.js'), 'r', function (err, rfd){
//   //fd 文件描述符 用来代表我操作的那个文件 以什么方式来操作
//   fs.read(rfd, buf, 0, 1, 0, function (err, bytesRead) {
//     fs.open(path.resolve(__dirname, 'new1.js'), 'w', function (err, wfd) {
//       console.log(wfd);
//       fs.write(wfd, buf, 0, 1, 0, function (err, written) {
//         console.log(written,'写入成功');
//       })
//     })
//   })  
// })
//读取数据默认展现给我们的是buffer类型如果文件不存在则报错，写入数据默认会清空文件，如果文件不存在会创建文件

function copy(source, target, cb) {
  const BUFFER_SIZE = 3
  let buffer = Buffer.alloc(BUFFER_SIZE)
  let readOffset = 0
  let writeOffet = 0
  fs.open(path.resolve(__dirname, source), 'r', function (err, rfd) {
    if(err) return cb(err)
    fs.open(path.resolve(__dirname, target), 'w', function (err, wfd) {
      if(err) return cb(err)
      function next() {
        fs.read(rfd, buffer, 0, BUFFER_SIZE, readOffset, function (err, bytesRead) {
          if(err) return cb(err)
          if (bytesRead == 0) {
            let index = 0
            let done = () => {
              if (++index == 2) {
                cb()
              }
            }
            fs.close(rfd, done)
            fs.close(wfd, done)
            return
          }
          fs.write(wfd, buffer, 0, bytesRead, writeOffet, function (err, bytesWrite) {
            readOffset += bytesRead;
            writeOffet += bytesWrite;
            setTimeout(() => {
              console.log('调用');
              next();
             }, 1000);
          })
        })
      }
      next();
    })
  })
}


// 读是读 写是写 要做的是拆分，将读写分离开， 用发布订阅来进行解耦合
copy('1.js', 'new1.js', function(err) {
  if (err) return console.log(err);
  console.log('成功')
})
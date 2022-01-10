const fs = require('fs')
const path = require('path')
const ReadStream = require('./ReadStream');

//我们文件的读写内部都是基于的stream模块将他的内容进行了封装实现了文件的读写流
// const rs = fs.createReadStream(path.resolve(__dirname,'./a.txt'), {
const rs = new ReadStream(path.resolve(__dirname,'./a.txt'), {
  flags:'r', //如果读取的文件不报错
  start:0 , // 从索引0 - 索引3 = 4个字节
  end:3,
  encoding:null, //buffer
  highWaterMark:3 ,//默认一次读取64K
  autoClose:true, //是否读取完毕后关闭可读流
  emitClose:true //是否触发close事件
}) //返回一个可读流对象

rs.on('open', function (fd) {
  console.log(fd);  
})
rs.on('error', function (err) {
  console.log(err);  
})
let arr = [];
rs.on('data', function (data) {//默认创建一个文件可读流不会将数据读取的，只有用户监听了data事件之后 才会将数据在内部发射出来 emit('data')
  arr.push(data)
  console.log(data); 
  rs.pause()
    
})
rs.on('end', function () {
  console.log('end',Buffer.concat(arr).toString()); // 最终拿到结果
})
// rs.on('close',function () {
//   console.log('close')
// })


setInterval(() => {
  rs.resume()
  
}, 1000);

/**
 * 常用的可读流中的方法 rs.on('data') rs.on('end') 标识是一个可读流（open 和close 事件是文件特有的） on('error')监控错误，我们可以控制速率 pause() resume()
 *  
 * */

/**
 * 
 * 可读流源码执行流程
 * 1.默认会创建一个可读流对象 new ReadStream
 * 2.Readable有一个父类 继承实列上的属性 和 原型上的方法
 * 3.this.open打开文件
 * 4.源码中打开文件后直接就读取文件了（我们写的是监听了data后才读取，源码中是直接读取，监听了data事件的时候直接将读取的数据发射了出来）
 * 5.调用父类的read方法子类调用了父类（父类可以调取子类的方法）再次回到子类的方法中
 * 6.会调用fs.read方法实现读取
 * 7.读取到文件后会调用push方法 将数据传入push方法也是父类的 触发emit事件 见数据派发出来
 * 8.如果文件读取完毕也可以触发end事件
 * 
 */
const fs = require('fs');
const path = require('path')
const WriteStream = require('./WriteStream1');

// let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {
//   highWaterMark:3
// })

// let flag = ws.write('1',()=>console.log('write')); // fs.open('w')
// console.log(flag)
// flag = ws.write('1',()=>console.log('write')); // fs.open('w')
// console.log(flag)
// flag = ws.write('1',()=>console.log('write')); // fs.open('w')  达到预期了，如果在写入那么就会超过预期 -》 false
// console.log(flag)
// flag = ws.write('1',()=>console.log('write')); // fs.open('w')
// console.log(flag)

// ws.on('drain', function () {
//   //当我们写入的内容达到highWaterMark的时候，并且写入的数据被清空，触发drain事件
//   console.log('drain');
// })
// //可写流多次操作 只有第一次是真实的像文件中写入，后面的会放到缓存中，等待第一次写入完毕后依次处理后续的逻辑

// let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {
//   highWaterMark:1 //我期望只用一个字节的内存来做这件事
// })

// let index = 0
// function write() {
//   let flag = true
//   while (index <= 9 && flag) {
//     flag = ws.write(index++ + '')
//   }
// }
// write()
// ws.on('drain', function () {
// write()
// console.log('干了'); 
// })
// let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {

let ws = new WriteStream(path.resolve(__dirname, 'b.txt'), {
  flags:'w', //写入的时候如果文件不存在会创建文件，如果文件中有内容 需要清空文件
  highWaterMark:3,//定义一个预期的值，超过或等于预期值就返回false，但是内容还是可以写入的（缓存区的大小）
  // encoding:'utf-8',
  // emitClose:true,
  // autoClose:true,
  // start:0
})
let index = 0;

function write() {
    let flag = true;
    while (index <= 9 && flag) { // 3
        flag = ws.write(index++ + ''); // string / number
    }
}
write();
ws.on('drain',function () {
    write();
    console.log('干了'); // 配合读取操作来实现一个 读一点写一点的功能
})


//多个异步操作防止错乱可以采用队列的方式来实现
//可写流有两个方法 ws.write()写入 ws.end()结束写入

// 我们期望读一点写一点的时候 可以采用flag作为标识,一般情况下都是取的快64K 写入预期为16K 你需要等待我写入完成时在读取
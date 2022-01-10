/**
 * buffer 表示内存的 编码格式是16进制（短小） 一个字节是8个位最大一个字节是255，用16进制来表示一个字节是两位ff
 * 
 * buffer声明的方式 （buffer的特点是一旦声明不能修改大小） 在声明buffer时需要传递大小
 */

 let buffer1 = Buffer.alloc(5) // 在node中最小标识单位是字节
 console.log(buffer1);

 let buffer2 = Buffer.from('跑步') //在node中编码采用的是utf8 1个汉字是三个字节
 console.log(buffer2);

 let buffer3 = Buffer.from([16]) //
 console.log(buffer3);


Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) { // Buffer很像数组
  for (let i = 0; i < sourceEnd - sourceStart; i++) {
    targetBuffer[targetStart + i] = this[sourceStart + i] //赋值的时候10进制也是可以的
  }
}

let bigBuffer = Buffer.alloc(3)

buffer2.copy(bigBuffer,0,0,3)
console.log(bigBuffer.toString());

//开发中经常会用到concat核心就是造一个大buffer将buffer拷贝到上面去

Buffer.concat = function (list, length = list.reduce((a, b) => a+b.length, 0)) {
  let bigBuffer = Buffer.alloc(length)
  let offset = 0
  list.forEach(buf => {
    buf.copy(bigBuffer, offset)
    offset += buf.length
  })
  return bigBuffer
}


let concat = Buffer.concat([buffer1, buffer2, buffer3], 13)

console.log(concat);

let buf8 = Buffer.from('天天向上');
let buf9 = buf8.slice(0, 6);
buf9[0] = 100
console.log(buf8, buf9);


console.log(Buffer.isBuffer(buf9)); //判断是否是Buffer

//分割数据
let buffer10 = Buffer.from('跑步*跑步*跑步*跑步*跑步')

Buffer.prototype.split = function (sep) {
  sep = Buffer.isBuffer(sep) ? sep : Buffer.from(sep)

  let sepLen = sep.length
  let arr = []
  let offset = 0 //从哪里开始查找
  let index = 0 //找到*的位置
  while (-1 != (index = this.indexOf(sep,offset))) {
    arr.push(this.slice(offset,index))
    offset = index + sepLen //跳过当前分隔符
  }
  arr.push(this.slice(offset))
  return arr
}
console.log(buffer10.split('*'));
// global上的重要属性  Buffer buffer代表的是内存

//计算机存储数据 二进制来存储的01来表示
//早期js没有读取数据的能力（文件读写 ）fs模块可以进行文件的读写。
//node为了能展现文件的内容，就采用了buffer这种格式 展现形式是16进制可以和字符串相互转化

//掌握基本的机制转化 如何实现一个base32数据格式

//2进制 0b开头 8进制0o  10进制   16进制 0x

/**
 * base64编码 -> base32是如何实现的？
 * 
 * base64用来干嘛？传递有价值 我们的数据不能用中文来进行传递（用中文传递会出现乱码）base64可以用在所有的链接处 减少请求（是否都要把图片转化成base64 把内容转化成base64之后数据会比之前大1/3）
 */

/**
 * base64编码 含义是转化出字节的大小不能超过64 一个字节8个位，不超过64的8个位最大是多少 最大是6个1不超过64
 */
let str = "追" 
//node默认支持utf8格式utf8中一个汉字是三个字节 三个字节是3*8 = 24个位 需要把汉字每6个位进行分割
console.log(Buffer.from(str)); // e8 bf bd

let str1 = (0xe8).toString(2)
let str2 = (0xbf).toString(2)
let str3 = (0xbd).toString(2)
console.log(str1, str2, str3);

let str1_ = parseInt('111010',2) //58
let str2_ = parseInt('001011',2) //11
let str3_ = parseInt('111110',2) //62
let str4_ = parseInt('111101',2) //61
console.log(str1_, str2_, str3_, str4_);
//base64就是一种编码格式

let strEn = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
strEn += strEn.toLowerCase()
strEn += '0123456789+/'// 26 +26 +12  = 64 个

console.log(strEn[58]+strEn[11]+strEn[62]+strEn[61]);//6L+9
//原来一个汉字是3个字节 现在是4个字节 数据大小增加了原来的1/3
//base64的解码就是按照这个流程 逆向回推的
console.log((58).toString(2));

//base32编码如何实现呢？ 最大不超过32的二进制数 为 5位

let str5_ = parseInt('11101',2) //29
let str6_ = parseInt('00010',2) //2
let str7_ = parseInt('11111',2) //31
let str8_ = parseInt('11011',2) //27
let str9_ = parseInt('11010',2) //26
console.log(str5_, str6_, str7_, str8_,str9_);
let strEn_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
strEn_ += '012345'
console.log(strEn_[29]+strEn_[2]+strEn_[31]+strEn_[27]+strEn_[26]);//3C510





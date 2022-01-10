const Promise = require('./promise')
const fs = require('fs');

const readFile = (filePath) => {
  return new Promise((resolve,reject)=>{
      fs.readFile(filePath,'utf8',function (err,data) {
          if(err) {// 失败了调用reject
              return reject(err);
          } 
          resolve(data); // 成功调用resolve
      })
  })
}
//实现promise的then链调用机制
/**
 * 1.如果promise中的then的回调（成功或者失败）返回一个普通值（不是promise，也不是抛出错误），会将这个普通值传递到下一次then的成功回调中
 * 2.如果发生了异常，那么会把这个异常抛出到下一次then的失败的回调中去
 * 3.如果返回的是一个promise 那么需要判断这个promise的状态。
 *   - 如果promise是成功 就继续将成功的结果传递到下一次的then的成功回调中
 *   - 如果promise是失败 就继续将失败的原因传递到下一次的then的失败回调中
 */

//  let promise2 = readFile('./age.txt').then(data => {
//    return data
//   // return new Promise((resolve,reject)=>{
//   //   setTimeout(() => {
//   //       resolve(new Promise((resolve,reject)=>{
//   //           setTimeout(() => {
//   //               resolve(500)
//   //           }, 2000);
//   //       }))
//   //   }, 1000);
//   // })
// })
// promise2.then((data)=>{
//     console.log('成功',data)
// },(err)=>{
//     console.log('失败',err)
// })

readFile('./age.txt').then(data => {
  return readFile(data)
}).then(data => {
  console.log(data)
},reason => {
  console.log(reason)
})
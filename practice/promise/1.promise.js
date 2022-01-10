/**
 * 1.promise 是一个类 使用的时候 我们需要new 这个类
 * 2.promise中需要传入一个执行器executor，executor默认会立即执行
 * 3.如果调用resolve会让状态变成成功，调用reject会让状态变成失败态
 * 4.new Promise 会产生一个promise实例, promise实例拥有一个then方法，第一个参数是成功的回调，第二个参数是失败的回调
 * 5.promise的状态一旦发生了改变 就不会发生变化了，成功有成功的value 失败有失败的原因reason
 * 6.如果new Promise中发生了 异常也会执行失败态
 * 7.如果出现异步逻辑我们就采用发布订阅模式 缓存回调，发布时依次执行
 * 
 */

let Promise = require('./promise/promise-juejin')

// let p = new Promise((resolve,reject) => {
//     resolve('成功')
// })

// p.then(value => {
//   console.log('value',value);
//   return 10000000000000
// },reason => {
//   console.log('reason',reason);
// }).then(value => {
//   console.log('value',value);
// },reason => {
//   console.log('reason',reason);
// })
let p = new Promise((resolve,reject) => {
  resolve('成功')
})

p.then(value => {
console.log('value',value);
//此处then函数中返回的是一个promsie，它的值又是一个promsie
//所以递归调用resolvePromise就是为了解决这种情况
return new Promise((resolve,reject) => { //第一个promise
  resolve(
      //第二个promise
      new Promise((resolve,reject) => {
        resolve('成功')
      })
  )
})
},reason => {
console.log('reason',reason);
}).then(value => {
console.log('value',value);
},reason => {
console.log('reason',reason);
})



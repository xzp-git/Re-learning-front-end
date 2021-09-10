
(function(){
  //构造函数
function Promise(executor){
  var self = this
  if(typeof executor !== 'function') throw new TypeError('Promise resolver' + executor + 'is not a function')
  if(!(self instanceof Promise)) throw new TypeEerror('undefined is not a promise')

  //私有属性： 状态 & 值
  self.state = 'pending'
  self.value = undefined
  self.onfulfilledCallbacks = []
  self.onrejectedCallbacks = []
  //用来修改实例的状态和值[立即] & 把之前基于then存储的onfulfilled/onrejected方法执行[异步]
  var change = function change(state, value){
    if(self.state !== 'pending') return
    self.state = state
    self.value = value
    setTimeout(function(){
      var callbacks = self.state === 'fulfilled' ? self.onfulfilledCallbacks : self.onrejectedCallbacks
      for(var i = 0; i < callbacks.length; i++){
        var callback = callbacks[i]
        if( typeof callback === 'function') callback(self.value)
      }
    })
  }
  
  //控制如何修改状态
  try{
    executor(function resolve(value){
      change('fulfilled', value)
    }, function reject(reason){
      change('rejected', reason)
    })
  }  catch(err) {
    change('rejected', err.message)
  }

}

var resolvePromise = function resolvePromise(promise, x, resolve, reject){
  if(x === promise) throw new TypeError('Chaining cycle detected for promise #<Promise>')
  if(x !== null && /^(object|function)$/i.test(typeof x)){
    var then
    try{  
      then = x.then
    }catch(err){
      reject(err)
    }
    if(typeof then === 'function'){
      //说明返回值x是一个promise实例
      var called = false
      try{
        then.call(x,function onfulfilled(y){
          if(called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        },function onrejected(r){
          if(called) return
          called = true
          reject(r)
        })
      }catch(err){
        if (called) return;
        reject(err)
      }
      return
    }
  }
  resolve(x)
}


var handle = function handle(callback, value, promise, resolve, reject){
  //callback:onfulfilled | onrejected
  // value:执行上述某个方法传递的值
  //promise:存储的是.then返回的新的Promise实例
  // resolve|reject:方法执行可以修改promise的状态和值
  try{
    var x = callback(value)
    resolvePromise(promise, x, resolve, reject)
  } catch (err){
    reject(err)
  }
}




// 向原型上扩展方法：供其实例调用
Promise.prototype = {
  constructor: Promise,
  then: function then(onfulfilled, onrejected){
        var self = this, promise = null

        if(typeof onfulfilled !== 'function'){
          onfulfilled = function onfulfilled(value){
            return value
          }
        }

        if(typeof onrejected !== 'function'){
          onrejected = function onrejected(reason){
            throw reason
          }
        }

        promise = new Promise(function (resolve, reject){
          //第一类：.then的时候已经知道了实例的状态，此时我们要创建一个'异步微任务'，执行对应的onfulfilled/onrejected
          //第二类：.then的时候还不知道实例的状态呢，此时我们把onfulfilled/onrejected先存储起来，后期状态修改后，通知对应的方法执行，只不过此时也是一个'异步微任务'
          // resolve执行，promise就是成功的； reject执行promise就是失败
          switch(self.state){
            case'fulfilled':
            //微任务为了兼容低版本浏览器，此处采用setTimeout 代替 queueMicrotask
              setTimeout(function(){
                handle(onfulfilled, self.value, promise, resolve, reject)
              })
              break
            case'rejected':
              setTimeout(function(){
                handle(onrejected, self.value, promise, resolve, reject)
              })
              break
            default:
              self.onfulfilledCallbacks.push(function(){
                handle(onfulfilled, self.value, promise, resolve, reject)
              })
              self.onrejectedCallbacks.push(function(){
                handle(onrejected, self.value, promise, resolve, reject)
              })
          }
        })
        return promise
  },
  catch:function my_catch(){
    return this.then(null, onrejected);
  }
}

if(typeof Symbol !== 'undefined') Promise.prototype[Symbol.toStringTag] = 'Promise'

Promise.resolve = function resolve(value){
  return new Promise(function(resolve){
    resolve(value)
  })
}

Promise.reject = function reject(reason){
  return new Promise(function(_, reject){
    reject(reason)
  })
}
var isPromise = function isPromise(x){
  if(x !== null && /^(object|function)$/i.test(typeof x)){
    if(typeof x.then === 'function') return true 
  }
  return false
}
Promise.all = function all(promises){
  if(!Array.isArray(promises)) throw new TypeError(promises + 'must be an Array')
  var n = 0,result = []
  return new Promise(function (resolve, reject){
    for(var i = 0; i < promises.length; i++){
      (function(i){
        var promise = promises[i]
        if(!isPromise(promise)) promise = Promise.resolve(promise)
        promise.then(function onfullfilled(value){
          n++;
          result[i] = value
          if( n >= promise.length) resolve(result)
        }).catch(function onrejected(reason){
          reject(reason)
        })
      })(i)
    }
  })
}

Promise.deferred = function deferred() {
  var result = {};
  result.promise = new Promise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
  });
  return result;
};
/* 暴露API */
if (typeof window !== 'undefined') window.Promise = Promise;
if (typeof module === 'object' && typeof module.exports === 'object') module.exports = Promise;
})()


// let p1 = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//       resolve(100);
//       // reject(0);
//   }, 1000);
// })
// console.log(p1)
// let p2 = p1.then(function onfulfilled(value) {
//   console.log('成功', value);
//   return Promise.reject(1000);
// }, function onrejected(reason) {
//   console.log('失败', reason);
// });

// console.log(p2)

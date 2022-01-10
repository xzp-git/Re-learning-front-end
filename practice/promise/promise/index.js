const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const resolvePromise = (promise, x, resolve, reject) => {
  //*******************************************************判断x与promsie是否是同一个promise，防止进入死循环*********************//////*********
  if(x === promise) throw new TypeError('Chaining cycle detected for promise #<Promise>')
  // 1.首先判断`x`是基础类型数据，还是引用类型，基础类型的数据直接`resolve`,即可。  
  if(x !== null && /^(object|function)$/.test(typeof x)){
    let then 
    // 2. 如果是引用类型的数据，尝试获取`x`上的`then`属性(`x.then`)，如果在获取属性的时候报异常则`reject`
    try{
      then = x.then
    }catch(e){
      reject(e)
    }
    //3. 判断`then`是否是函数，如果是一个函数则我们认定它为`Promise`,如果不是则`resolve`
    if(typeof then === 'function'){
      let called = false //**************************************这里加了变量*************************//////
      try{
        then.call(x, (y) => {
          if(called) return //**************************************这里加了变量*************************//////
          called = true
          resolvePromise(promise, y, resolve, reject)
        },(r) => {
          if(called) return//**************************************这里加了变量*************************//////
          reject(r)
        })
      }catch(e){
        if(called) return//**************************************这里加了变量*************************//////
        reject(e)
      }
    }else{
      resolve(x)
    }
  }else{
    //基础类型数据直接resolve
    resolve(x)
  }
}
class Promise{
  constructor(executor){

    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    //存放onFulfilled
    this.onResolvedCallbacks = []
    //存放onRejected
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.value = value
        this.state = FULFILLED
        //promise实例状态改变后调用暂存的onFulfilled
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason
        this.state = REJECTED
        //promise实例状态改变后调用的onRejected
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      //executor函数执行过程中出错，将会导致Promise失败
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let promise = new Promise((resolve, reject) => {
        
        switch(this.state){
          case FULFILLED:
              setTimeout(() => {
                try{
                  let x = onFulfilled(this.value)
                  resolvePromise(promise, x, resolve, reject)
                } catch(e){
                  reject(e)
                }
              })   
              break
          case REJECTED:
              setTimeout(() => {
                try{
                  let x = onRejected(this.reason)
                  resolvePromise(promise, x, resolve, reject)
                } catch(e){
                  reject(e)
                }
              })   
              break
          default:
            this.onResolvedCallbacks.push(() => {
              setTimeout(() => {
                try{
                  let x = onFulfilled(this.value)
                  resolvePromise(promise, x, resolve, reject)
                } catch(e){
                  reject(e)
                }
              })
            })
            this.onRejectedCallbacks.push(() => {
              setTimeout(() => {
                try{
                  let x = onRejected(this.reason)
                  resolvePromise(promise, x, resolve, reject)
                } catch(e){
                  reject(e)
                }
              })
            })
        }
    })
    return promise
  }
}

Promise.deferred = function(){
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  })
  return dfd;
}




module.exports = Promise
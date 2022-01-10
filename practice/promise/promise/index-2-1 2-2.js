const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise{
  constructor(executor){

    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = [] 
    this.onRejectedCallbacks = [] //如果出现异步逻辑我们就采用发布订阅模式 缓存回调，发布时依次执行
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.value = value
        this.state = FULFILLED
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason
        this.state = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve,reject)
    } catch (error) { //如果执行时发生了异常就将异常作为失败的原因
      reject(error)
    }
  }
  then(onFulfilled, onRejected){
    let promise = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolve(x)
          } catch (error) {
            reject(error)
          }
        })
      }
  
      if (this.state === REJECTED) {
        
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolve(x)
          } catch (error) {
            reject(error)
          }
        })
      }
  
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise
  }
}





module.exports = Promise
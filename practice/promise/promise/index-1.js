const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise{
  constructor(executor){

    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
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
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected){
    if (this.state === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.state === REJECTED) {
      onRejected(this.reason)
    }

    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onResolvedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }

  }
}





module.exports = Promise
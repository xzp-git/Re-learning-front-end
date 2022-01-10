

function EventEmitters() {
  this._events = Object.create(null)
}

//订阅

EventEmitters.prototype.on = function (eventName, callback) {

  if(!this._events) this._events = Object.create(null)  
  let eventCallbacks = this._events[eventName] || (this._events[eventName] = [])
  
  // 没放到数组之前 我需要出发newListener对应的事件

  if (eventName !== 'newListener') this.emit('newListener', eventName)

  eventCallbacks.push(callback)
}

//发布

EventEmitters.prototype.emit = function (eventName, ...args) {
  if(!this._events) this._events = Object.create(null)  
  let eventCallbacks = this._events[eventName]
  eventCallbacks && eventCallbacks.forEach(cb => cb(...args))
}

//once也是绑定事件 只不过稍后触发的时候需要将自己移除
EventEmitters.prototype.once = function (eventName, callback) {
  const once = (...args) => { //为了方便扩展
    callback(...args)
    this.off(eventName, once)
  }
  once.l = callback
  this.on(eventName, once)
}
EventEmitters.prototype.off = function (eventName, callback) {
  if(!this._events) this._events = Object.create(null)
  let eventCallbacks = this._events[eventName]
  if (eventCallbacks) {
    this._events[eventName] = this._events[eventName].filter(item => (item !== callback) && (item.l !== callback))
  }
}






let em = new EventEmitters()

em.on('test',(params) => {
  console.log(params+1);
})
em.on('test',(params) => {
  console.log(params+2);
})
em.on('test',(params) => {
  console.log(params+3);
})
em.emit('test',0)
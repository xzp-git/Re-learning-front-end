const fs = require('fs')
//发布订阅模式


class EventEmitter{
  constructor(){
    this.subs = Object.create(null)
  }

  $on(eventType,handler){
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }
  $emit(eventType,params){
    if (this.subs[eventType]) {
      this.subs[eventType].forEach(handler => handler(params))
    }
  }
}

let e = new EventEmitter()
e.$on('file',(arg) => {
  console.log('arg收到了一个数据',arg);
})

fs.readFile('./name.txt', 'utf8', function (err, data) {
  e.$emit('file',data)
})

fs.readFile('./age.txt', 'utf8', function (err, data) {
  e.$emit('file',data)
})
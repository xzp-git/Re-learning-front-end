class Subject{ //目标
  constructor(name){
    this.subs = []
    this.state = '开心'
    this.name = name
  }
  attach(o){//被观察者要接收观察者
    this.subs.push(o)
  }
  setState(newState){
    this.state = newState
    this.subs.forEach(o => o.update(this))
  }

}

class Observer{ //观察者
  constructor(name){
    this.name = name
  }
  update(s){
    console.log(this.name+":"+s.name+'当前的状态是' + s.state);
  }
}

let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
let s = new  Subject('宝宝')

s.attach(o1)
s.attach(o2)
s.setState('不开心')


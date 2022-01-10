const LinkedList = require('./LinkedList')


class Queue{
  constructor(){
    this.ll = new LinkedList()
  }
  add(element){
    this.ll.add(element)
  }
  peak(){
    return this.ll.remove(0)
  }
}

module.exports = Queue

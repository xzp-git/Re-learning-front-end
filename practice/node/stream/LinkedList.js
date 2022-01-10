

//栈 队列 链表 都是线性结构
//遍历数组 链表  时间复杂度时O(n)  链表 可以优化头部删除 不需要移动后面的节点（如果考虑需要删除 头部尾部 可以考虑使用链表） 线性结构

//数据结构本身的目的就是来存储数据 增删改查

class Node{
  constructor(element, next){
    this.element = element
    this.next = next || null
  }
}

class LinkedList {
  constructor(){
    this.head = null
    this.size = 0
  }

  findNode(index){
    let current = this.head //从头部开始查找
    for (let i = 0; i < index; i++) {
      current = current?current.next :null
    }
    return current
  }
  add(index, element){
    if (arguments.length == 1) {
      element = index
      index = this.size // 让索引指向最后一项
    }
    if (index == 0) { //这个就是头节点
      let head = this.head
      this.head = new Node(element, head)
    }else{ //索引不是0的情况
      //通过索引查找前一个节点
      let prevNode = this.findNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }
  get(index){
    return this.findNode(index)
  }

  set(index, element){
    let node = this.findNode(index)
    node.element = element
  }

  remove(index){
    let node
    if (index == 0) {
      node = this.head
      if(!node) return undefined
      this.head = this.head.next
    }else{
      let prevNode = this.findNode(index - 1)
      node = prevNode.next
      prevNode.next = prevNode.next.next
    }
    this.size--
    return node
  }
  reverse(){


    /**
     * 以两个元素为例 去递归
     * 
     * let head = this.head
     * let newHead = head.next 将新头指向2
     * head.next.next = head 让2的下一个指向1
     * head.next = null //让1的下一个指向null
     * return newHead
     */

    function r(head) {
      if (head == null || head.next == null) return head
      let newHead = r(head.next) //当前head是谁
      head.next.next = head //两两反转
      head.next = null
      return newHead
    }
    return r(this.head)
  }
  reverse1(){
    let head = this.head
    if(head == null || head.next == null) return head
    let newHead = null
    while (head !== null) {
      let t = head.next //保存 后续的 2 3 4链表 
      head.next = newHead  //让1的next 指向null
      newHead = head //让这个新头 指向迁移过来的头

      head = t // 把head的指针向后移动
    }
    return newHead
  }
}


// let linkedList = new LinkedList()

// let arr = [122, 566, 888, 333, 444, 996, 36]
// arr.forEach((element, index) => {
//   linkedList.add(index, element)
// });
// console.log(linkedList.get(5));
// console.log(linkedList.set(5, 1010));
// console.log(linkedList.remove(5));
// console.dir(linkedList,{depth:100});

// console.dir(linkedList.reverse1() ,{depth:100});

module.exports = LinkedList

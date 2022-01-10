//binary search tree

class Node{
  constructor(element, parent){
    this.element = element
    this.left = null 
    this.right = null
    this.parent = parent
  }
}

class BST{
  constructor(compare){
    this.root = null
    let temoCompare = this.compare
    this.compare = compare || temoCompare
  }
  compare(n1, n2){
    return n1 > n2
  }
  add(element){
    if (this.root == null) {
      this.root = new Node(element, null)
      return
    } else {
      let current = this.root
      let parent = null
      let compare = true
      while (current) { //从根上不停的查找父节点
        parent = current
        compare = this.compare(current.element, element)
        if (compare) { //左边
          current = current.left
        } else { //右边
          current = current.right
        }
      }
      // 找到父节点后 创造一个新的节点 需要把他插入到parent 左边或者右边
      let newNode = new Node(element, parent)
      if (compare) {
        parent.left = newNode
      }else {
        parent.right = newNode
      }
    }
  }
  //前序遍历
  preorderTraversal(cb){
    const traversal = (node) => {
      if(node == null) return 
      cb(node)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  //中序遍历
  inorderTraversal(cb){
    const traversal = (node) => {
      if(node == null) return 
      traversal(node.left)
      cb(node)
      traversal(node.right)
    }
    traversal(this.root)
  }
  //后序遍历
  postorderTraversal(cb) {
    const traversal = (node) => {
        if (node == null) return;
        traversal(node.left);
        traversal(node.right);
        cb(node)
    }
    traversal(this.root);
  }
  //层序遍历
  levelOrderTraversal(cb){
    let stack = [this.root]
    let i = 0
    let currentNode
    while (currentNode = stack[i++]) {
      cb(currentNode)
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
    }
  }
  //反转二叉树  需要递归遍历一遍二叉树
  invertTree(){
    const traversal = (node) => {
      if(node == null) return
      
      traversal(node.left)
      traversal(node.right)
      let r = node.right
      node.right = node.left
      node.left = r
    }
    traversal(this.root)

    // let stack = [this.root]
    // let i = 0
    // let currentNode
    // while (currentNode = stack[i++]) {
    //     let r = currentNode.right
    //     currentNode.right = currentNode.left
    //     currentNode.left = r
    //   if (currentNode.left) {
    //     stack.push(currentNode.left)
    //   }
    //   if (currentNode.right) {
    //     stack.push(currentNode.right)
    //   }
    // }
    return this.root
  }
}


let bst = new BST((a, b) => {
  return a.age > b.age; // 返回true/ false
}); // binary search tree
let arr = [{ age: 10 }, { age: 8 }, { age: 19 }, { age: 6 }, { age: 15 }, { age: 22 }]; // 
arr.forEach(item => {
  bst.add(item);
});

// console.dir(bst, { depth: 20 })

const fn = (node) => {
  console.log(node,"-------------");
}
// bst.preorderTraversal(fn)
// bst.inorderTraversal(fn)
// bst.postorderTraversal(fn)
// bst.levelOrderTraversal(fn)

console.dir(bst.invertTree(), { depth: 20 })



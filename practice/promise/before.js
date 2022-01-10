/**
 * 扩展公共的函数方法，不改动影响原先函数的逻辑
 * 
 */
 function coreFn(a, b, c) {
  //实现了核心逻辑
  console.log('core fn', a, b, c);
}

Function.prototype.before = function before(beforeFn) {
  let self = this
  return function(...params) {
    beforeFn()
    self.call(this, ...params)
  }
}


let newFn = coreFn.before(() => {
  //要扩展的程序
  console.log('扩展');
})

newFn('参数', 'b', 'c')



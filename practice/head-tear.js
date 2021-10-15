


// const clearTimer = function clearTimer(timer){
//   if(timer){
//     clearTimeout(timer)
//   }
//   return null
// }



/**
 * 
 * @param {*} func 需要防抖的函数
 * @param {*} wait 多久时间之内触发多次算是频繁触发  默认值 500
 * @param {*} immediate 触发边界 true 开始边界触发  false 结束边界触发   默认值 false
 */
// const debounce = function debounce(func, wait, immediate){

//     // 处理参数
//     if(typeof func !== 'function') throw new TypeError('func must be an function')
//     if(typeof wait === 'boolean') immediate = wait
//     if(typeof wait !== 'number') wait = 500
//     if(typeof immediate !== 'boolean') immediate = false

//     let timer = null
//     return function operate(...params) {
//       let now = !timer && immediate
//       timer = clearTimer(timer)
//       timer = setTimeout(() => {
//         timer = clearTimer(timer)

//         if(!immediate) func.call(this, ...params)

//       },wait)
//       if ( now ) func.call(this,...params)
//     }
// }

const clearTimer = function clearTimer(timer) {
  if (timer) {
    clearTimeout(timer)
  }
  return null
}

// const debounce = function debounce(func, wait, immediate){
//   if(typeof func !== 'function') throw new TypeError(`${func} must be a function`)

//   if(typeof wait === 'boolean') immediate = wait
//   if(typeof wait !== 'number') wait = 500
//   if(typeof immediate !== 'boolean') immediate = false

//   let timer = null
//   return function operate(...params){
//     let now = !timer && immediate
//     timer = clearTimer(timer)
//     timer = setTimeout(() => {
//       timer = clearTimer(timer)
//       if(!immediate) func.call(this,...params)
//     },wait)
//     if(now) func.call(this,...params)
//   }
// }

// const debounce = function debounce(func, wait, immediate){
//   // 判断参数
//   if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
//   if(typeof wait === 'boolean') immediate = wait
//   if(typeof wait !== 'number') wait = 500
//   if(typeof immediate !== 'boolean') immediate = false

//   let timer = null 
//   return function operate(...params){
//     let now = !timer && immediate

//     tiemr = clearTimer(timer)
//     timer = setTimeout(() => {
//       tiemr = clearTimer(timer)
//       if(!immediate) func.call(this, ...params)
//     },wait)
//     if( now ) func.call(this, ...params)
//   }
// }

// const debounce = function debounce(func, wait, immediate){

//   if(typeof func !== 'function') throw new TypeError(`${func} must be a function`)
//   if(typeof wait === 'boolean') immediate = wait
//   if(typeof wait !== 'number') wait = 500
//   if(typeof immediate !== 'boolean') immediate = false

//   let timer = null

//   return function operate(...params){
//     let now = !timer && immediate
//     timer = clearTimer(timer)
//     timer = setTimeout(()=> {
//       timer = clearTimer(timer)
//       if(!immediate) func.call(this,...params)
//     },wait)
//     if(now) func.call(this, ...params)
//   }
// }

// const debounce = function debounce(func, wait, immediate){
//   if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
//   if(typeof wait === 'boolean') immediate = wait
//   if(typeof wait !== 'number') wait = 500
//   if(typeof immediate !== 'boolean') immediate = false

//   let timer = null
//   return function operate(...params){

//     let now = !timer && immediate 
//     timer = clearTimer(timer)
//     timer = setTimeout(() => {
//       timer = clearTimer(timer)
//       if(!immediate) func.call(this,...params)
//     }, wait)
//     if ( now ) func.call(this, ...params) 
//   }
// }


const debounce = function debounce(func, wait, immediate) {
  if (typeof func !== 'function') throw new TypeError(`${func} is not a function`)
  if (typeof wait === 'boolean') immediate = wait
  if (typeof wait !== ' number') wait = 500
  if (typeof immediate !== 'boolean') immediate = false

  const clearTimer = function clearTimer(timer) {
    if (timer) {
      clearTimeout(timer)
    }
    return null
  }

  let timer = null
  return function operate(...params) {
    let now = !timer && immediate
    timer = clearTimer(timer)
    timer = setTimeout(() => {
      timer = clearTimer(timer)
      //结束边界触发
      if (!immediate) func.call(this, ...params)
    }, wait)
    //开始边界触发
    if (now) func.call(this, ...params)
  }
}



let btn = document.querySelector(".btn")
const clickFn = function clickFn(e) {
  console.log(e, 11111111111111)
}
btn.onclick = debounce(clickFn, 1000)


/**
 * 
 * @param {*} func 需要处理的函数
 * @param {*} wait 多久触发一次
 */
// const throttle = function throttle(func,wait){
//   if ( typeof func !== 'function' ) throw new TypeError('func must be an function')
//   if ( typeof wait !== 'number' ) wait = 500

//   let timer = null,
//       previous = 0
//   return function operate(...params){
//     let now = +new Date(),
//         remaining = wait - ( now - previous )
//         if ( remaining <= 0 ){
//           timer = clearTimer(timer)
//           func.call(this, ...params)
//           previous = +new Date()
//         }else if(!timer){
//           timer = setTimeout(() => {
//             timer = clearTimer(timer)
//             func.call(this,...params)
//             previous = +new Date ()
//           },remaining)
//         }
//   }
// }



// const throttle = function throttle(func,wait){
//   if(typeof func !== 'function') throw new TypeError(`${func} must be a function`)
//   if(typeof wait !== 'number') wait = 500

//   let timer = null,
//       previous = 0
//   return function operate(...params){
//     let now = +new Date(),
//         remaining = wait - (now - previous)
//     if(remaining <= 0){
//       func.call(this,...params)
//       previous = +new Date()
//     }else if(!timer){
//       timer = setTimeout(() => {
//         timer = clearTimer(timer)
//         func.call(this,...params)
//         previous = +new Date()
//       },remaining)
//     }
//   }
// }

// const throttle = function throttle(func, wait){
//   if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
//   if(typeof wait !== 'number') wait = 500

//   let timer = null,
//       previous = 0
//   return function operate(...params){

//     let now = +new Date(),
//         remaining = wait - (now - previous)

//     if(remaining <= 0){
//       func.call(this, ...params)
//       previous = +new Date()
//     }else if(!timer){
//       timer = setTimeout(()=> {
//         timer = clearTimer(timer)
//         func.call(this, ...params)
//         previous = +new Date()
//       },remaining)
//     }

//   }
// }

// const _throttle = function _throttle(func,wait){
//   if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
//   if(typeof wait !== 'number') wait = 500

//   let timer = null, previous = 0
//   return function operate(...params){
//     let now = +new Date(),
//         remaining = wait - (now - previous) 
//     if(remaining <= 0){
//       func.call(this, ...params)
//       previous = +new Date()
//     }else if(!timer){
//       timer = setTimeout(()=>{
//         timer = clearTimer(timer)
//         func.call(this, ...params)
//         previous = +new Date()
//       },remaining)
//     }

//   }
// }

// const throttle = function throttle(func, wait){

//   if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
//   if(typeof wait !== 'number') wait = 500

//   let  timer = null, previous = 0
//   return function operate(...params){
//     let now = +new Date(), 
//         remaining = wait - (now - previous)
//         
//     if(remaining <= 0){
//       func.call(this, ...params)
//       previous = +new Date()
//     }else if(!timer){
//       timer = setTimeout(() => {
//         timer = clearTimer(timer)
//         func.call(this, ...params)
//         previous = +new Date()
//       },remaining)
//     }    
//   }
// }

const throttle = function throttle(func, wait) {
  if (typeof func !== 'function') throw new TypeError(`${func} is not a function`)
  if (typeof wait !== 'number') wait = 500

  const clearTimer = function clearTimer(tiemr) {
    if (timer) {
      clearTimeout(timer)
    }
    return null
  }

  let timer = null,
    previous = 0
  return function operate(...params) {
    let now = +new Date(),
      remaining = wait - (now - previous)
    if (remaining <= 0) {
      func.call(this, ...params)
      previous = +new Date()
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = clearTimer(timer)
        func.call(this, ...params)
        previous = +new Date()
      }, remaining)
    }
  }
}

window.onscroll = throttle(clickFn)



/**
 * 
 * new  
 */

function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log('wangwang');
};
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name);
};



// const _new = function _new(Ctor, ...params){
//   if(typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a consturctor`)

//   let name = Ctor.name,
//       proto = Ctor.prototype
//   if(/^(Symbol|BigInt)$/i.test(name) || !proto) throw new TypeError(`${Ctor} is not a constructor`)

//   let obj = Object.create(proto)
//   let result = Ctor.call(obj,...params)

//   if(result !== null && /^(object|function)$/i.test(typeof result)) return result
//   return obj
// }


// const _new = function _new (Ctor,...params) {
//   if(typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a constructor`)
//   let name = Ctor.name
//       proto = Ctor.prototype
//   if(/^(Symbol|BigInt)$/i.test(name) || !proto) throw new TypeError(`${Ctor} is not a constructor`)

//   let obj = Object.create(proto)

//   let result = Ctor.call(obj,...params)

//   if(result !== null && /^(object|function)$/i.test(typeof result)) return result
//   return obj
// }

// const _new = function _new (Ctor, ...params){
//   if(typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a constructor`)
//   let name = Ctor.name,
//       proto = Ctor.prototype
//   if(/^(Symbol|BigInt)$/i.test(name) || !proto ) throw new TypeError(`${Ctor} is not a constructor`)

//   let obj = Object.create(proto)

//   let result = Ctor.call(obj, ...params)

//   if(result !== null && /^(object|function)$/i.test(typeof result)) return result

//   return obj
// }

// const _new = function _new(Ctor, ...params){
//   if(typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a constructor`)
//   let name = Ctor.name,
//       proto = Ctor.prototype
//   if(/^(Symbol|BigInt)$/.test(name) || !proto) throw new TypeError(`${Ctor} is not a constructor`)

//   let obj = Object.create(proto)

//   let result = Ctor.call(obj, ...params)

//   if(result !== null && /^(object|function)$/.test(typeof result)) return result
//   return obj
// }


// const _new = function _new(Ctor, ...params){

//   if(typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a constructor`)
//   let name = Ctor.name,
//       proto = Ctor.prototype
//   if(/^(Symbol|BigInt)$/.test(name) || !proto) throw new TypeError(`${Ctor} is not a constructor`)

//   let obj = Object.create(Ctor.prototype)

//   let result = Ctor.call(obj, ...params)

//   if(result !== null && /^(object|function)$/.test(typeof result)) return result
//   return obj
// }

const _new = function _new(Ctor, ...params) {
  if (typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a constructor`)
  let name = Ctor.name,
    proto = Ctor.prototype
  if (/^(Symbol|BigInt)$/.test(name) || !proto) throw new TypeError(`${Ctor} is not constructor`)

  let obj = Object.create(proto)

  let result = Ctor.call(obj, ...params)

  if (result !== null && /^(object|function)$/.test(typeof result)) return result
  return obj
}


let sanmao = new Dog('三毛');
sanmao.sayName();
sanmao.bark();

let sanmao1 = _new(Dog, '三毛111111111')
sanmao1.sayName();
sanmao1.bark();



/**
 * 
 * @param {*} obj 右侧要检测的目标对象
 * @param {*} Ctor 左侧的构造函数
 */
/**
 * 
 * const instance_of = function instance_of(obj, Ctor){
  if(Ctor == null) throw new TypeError('Right-hand side of instance is not an object')
  if(typeof Ctor !== 'function') throw new TypeError('Right-hand side og instance is not callable')
  if(!Ctor.prototype) throw new TypeError('Function has non-object prototype undefined in instanceof check')

  if(obj == null || !/^(object|function)$/i.test(typeof obj)) return false
  
  if(typeof Ctor[Symbol.hasInstance] === 'function') return Ctor[Symbol.hasInstance](obj)
  
  let prototype = Object.getPrototypeOf(obj)
  while(obj){
    if(prototype === Ctor.prototype) return true
    prototype = Object.getPrototypeOf(prototype)
  }
  return false
}
 * 
 */

//  const instance_of = function instance_of(obj, Ctor){
//   if(Ctor == null) throw new TypeError('Right-hand side of instanceof is not an object')
//   if(typeof Ctor !== 'function') throw new TypeError('Right-hand side of instanceof is not callable')
//   if(!Ctor.prototype) throw new TypeError('Function has non-object prototype undefined in instanceof check')

//   if(obj == null || !/^(object|function)$/i.test(typeof obj)) return false

//   if(typeof Ctor[Symbol.hasInstance] === 'function') return Ctor[Symbol.hasInstance](obj)

//   let prototype = Object.getPrototypeOf(obj)
//   while(prototype){
//     if(prototype === Ctor.prototype) return true
//     prototype = Object.getPrototypeOf(prototype)
//   }
//   return false 
//  }

// const instance_of = function instance_of(obj, Ctor){
//   if(Ctor == null) throw new TypeError('Right-hand side of instanceof is not an object')
//   if(typeof Ctor !== 'function') throw new TypeError ('Right-hand side of instanceof is not callable')
//   if(!Ctor.prototype) throw new TypeError('Function has non-object prototype undefined in instanceof check')

//   if(obj == null || !/^(object|function)$/i.test(typeof obj)) return false

//   if(typeof Ctor[Symbol.hasInstance] === 'function') return Ctor[Symbol.hasInstance](obj)

//   let prototype = Object.getPrototypeOf(obj)

//   while(prototype){
//     if(prototype === Ctor.prototype) return true
//     prototype = Object.getPrototypeOf(prototype)
//   }
//   return false
// }

// const instance_of = function instance_of(obj, Ctor){
//   if(Ctor == null) throw new TypeError('Right-hand side of instanceof is not an object')
//   if(typeof Ctor !== 'function') throw new TypeError('Right-hand side of instanceof is not callabel')
//   if(!Ctor.prototype) throw new TypeError('Function has non-object prototype undefined in instanceof check')

//   if(obj == null || !/^(object|function)$/i.test(typeof obj)) return false

//   if(typeof Ctor[Symbol.hasInstance] === 'function') return Ctor[Symbol.hasInstance](obj)

//   let prototype = Object.getPrototypeOf(obj)
//   while(prototype){
//     if(prototype === Ctor.prototype) return true
//     prototype = Object.getPrototypeOf(prototype)
//   }
//   return false
// }

// const instance_of = function instance_of(obj, Ctor){
//   if(Ctor == null) throw new TypeError('Right-hand side of instanceof is not a object')
//   if(typeof Ctor !== 'function') throw new TypeError('Right-hand side of instanceof is not callable')
//   if(!Ctor.prototype) throw new Error('Function has non-object prototype undefined in instanceof check')

//   if(obj == null || !/^(object|function)$/i.test(typeof obj)) return false

//   if(typeof Ctor[Symbol.hanInstance] === 'function') return Ctor[Symbol.hasInstance](obj)

//   let prototype = Object.getPrototypeOf(obj)
//   while(prototype){
//     if(prototype === Ctor.prototype) return true
//     prototype = Object.getPrototypeOf(prototype)
//   }
//   return false
// }

const instance_of = function instance_of(obj, Ctor) {
  if (Ctor == null) throw new TypeError('Right-hand side of instanceof is not a object')
  if (typeof Ctor !== 'function') throw new TypeError('Right-hand side of instanceof is not callable')
  if (!Ctor.prototype) throw new Error('Function has non-object prototype undefined in instanceof check')

  if (obj == null || !/^(object|function)$/.test(typeof obj)) return false

  if (typeof Ctor[Symbol.hasInstance] === 'function') return Ctor[Symbol.hasInstance](obj)

  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    if (proto === Ctor.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

console.log(instance_of(/^$/, Array))
console.log(instance_of(/^$/, RegExp))
// console.log(instance_of(/^$/,() => {}))

/**
 * 
 * @param {*} func 需要柯里化的函数
 */
// const curry = function curry (func) {
//   if (typeof func !== 'function') throw new TypeError(`${func} must be a function`)
//   return function curriedFn (...args) {
//     if(args.length < func.length){
//       return function(...argus){
//         return curriedFn(...args.concat(argus))
//       }
//     }
//     return func(...args)
//   }
// }


// const curry = function curry(func){
//   if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)

//   return function curriedFn(...args){
//     if(args.length < func.length){
//       return function(...argus){
//         return curriedFn(...args.concat(argus))
//       }
//     }
//     return func(...args)
//   }
// }

// const curry = function currt(func){

//   if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
//   return function curried(...arg){
//     if(arg.length < func.length){
//       return function(...args){
//         return curried(...arg.concat(args))
//       }
//     }
//     return func.call(this, ...arg)
//   }
// }

const curry = function curry(func) {
  if (typeof func !== 'function') throw new TypeError(`${func} is not a function`)

  return function curried(...params) {
    if (params.length < func.length) {
      return function (...args) {
        return curried(...params.concat(args))
      }
    }
    return func(...params)
  }
}

/**
 * 
 * 函数的组合
 */
// const compose = function compose(...funcs){
//   let len = funcs.length
//   if(len === 0) return x => x
//   if(len === 1) return funcs[0]
//   return function operate(x){
//     return funcs.reduceRight((result,func)=> func(result),x)
//   }
// }

// const compose = function compose(...funcs){

//   let len = funcs.length
//   if( len === 0 ) return x => x
//   if( len === 1 ) return funcs[0]
//   return function operate(x){
//     return funcs.reduceRight((memo,result) => {
//       result(memo)
//     },x)
//   }
// }

// const compose = function compose(...funcs){
//   let len = funcs.length
//   if (len === 0) return x => x
//   if (len === 1 ) return funcs[0]
//   return function operate(x) {
//     return funcs.reduceRight((memo, func) => {
//       return func(memo)
//     },x)
//   }
// }

const compose = function compose(...funcs) {
  let len = funcs.length
  if (len === 0) x => x
  if (len === 1) return funcs[0]
  return function operate(x) {
    return funcs.reduceRight((memo, func) => {
      return func(memo)
    }, x)
  }
}

const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
const operate = compose(div2, mul3, add1, add1)
console.log(operate(0)) //=>相当于div2(mul3(add1(add1(0)))) 
console.log(operate(2)) //=>相当于div2(mul3(add1(add1(2))))



/**
 * 解析url的字符串中的参数
 * @param {*} attr 需要获取的属性 
 */
// String.prototype.queryUrlParams = function queryUrlParams(attr){
//   attr = attr + ''
//   let obj = {}
//   this.replace(/#([^?=&#]+)/g, (_, $1) => obj['_HASH'] = $1)
//   this.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, $1, $2) => obj[$1] = $2)
//   if(attr !== 'undefined') return obj[attr]
//   return obj
// }
// https://xxxxxxx.cn/pins/#/flow?sort=new&name=zs&age=20 =>  {_HASH:'/flow',name:'zs', sort:'new', age:'20'}
String.prototype.queryUrlParams = function queryUrlParams(attr) {
  attr = attr + ''
  let obj = {}
  this.replace(/#([^#&=?]+)/g, (_, $1) => obj['_HASH'] = $1)
  this.replace(/([^#&=?]+)=([^#&=?]+)/g, (_, $1, $2) => obj[$1] = $2)
  if (attr !== 'undefined') return obj[attr]
  return obj
}

// String.prototype.queryUrlParams = function queryUrlParams(attr) {
//   attr = attr + ''
//   let obj = {}
//   this.replace(/#([^#&=?]+)/g,(_, $1) => obj['_HASH'] = $1)
//   this.replace(/([^#&=?]+)=([^#&+?]+)/g, (_, $1, $2) => obj[$1] = $2)
//   if (attr !== 'undefined') return obj[attr]
//   return obj 
// }



/**
 * 
 * 
 * @param {*} context 要改变的this指向
 * @param  {...any} params 需要传递的参数
 */

// Function.prototype.call = function call(context,...params){
//   if(context == null) context = window
//   if(!/^(object|function)$/i.test(typeof context)) context = Object(context)
//   let key = Symbol(),
//       result
//   context[key] = this
//   result = context[key](...params)
//   delete context[key]
//   return result
// }

// Function.prototype.call = function call(context, ...params){
//   if(context == null) context = window
//   if(!/^(object|function)$/.test(typeof context)) context = Object(context)
//   let key = Symbol()
//   context[key] = this
//   let result = context[key](...params)
//   delete context[key]

//   return result
// }

Function.prototype.call = function call(context, ...params) {
  if (context == null) context = window
  if (!/^(object|function)$/.test(typeof context)) context = Object(context)
  let key = Symbol(), result
  context[key] = this
  result = context[key](...params)
  delete context[key]
  return result
}

Function.prototype.apply = function apply(context, params) {
  if (context == null) context = window
  if (!/^(object|function)$/.test(typeof context)) context = Object(context)
  let key = Symbol(), result
  context[key] = this
  result = context[key](params)
  delete context[key]
  return result
}

Function.prototype.bind = function bind(context, ...params) {
  let self = this
  return function operate(...args) {
    return self.call(context, ...params.concat(args))
  }
}

// Function.prototype.apply = function apply(context,params){
//   if(context == null) context = window
//   if(!/^(object|function)$/i.test(typeof context)) context = Object(context)
//   let key = Symbol(),
//       result
//   context[key] = this
//   result = context[key](...params)
//   delete context[key]
//   return result
// }

// Function.prototype.bind = function bind(context,...params){
//   let self = this
//   return function(...args){
//     return self.call(context,...params.concat(args))
//   }  
// }

// Function.prototype.bind = function bind(context, ...params){

//   let self = this
//   return function operate(...args){
//     return self.call(context,...params.concat(args))
//   }
// }

const fn = function fn(x, y) {
  console.log(this, x, y);
  return x + y;
};
let obj = {
  name: 'obj'
};

// let result = fn.apply('AA', [10, 20])
let result = fn.bind('AA', 10, 20)
console.log(result())


// const isEmptyObject = function isEmptyObject(obj){
//   let keys = Object.keys(obj)
//   if(typeof Symbol !== 'undefined') keys = keys.concat(Object.getOwnPrototypeSymbols(obj))
//   return keys.length === 0
// }

// const isEmptyObject = function isEmptyObject(obj){
//   let keys = Object.keys(obj)
//   if(typeof Symbol !== 'undefined') keys = keys.concat(Object.getOwnPrototypeSynbols(obj))
//   return keys.length === 0
// } 


// const checkType = function checkType(obj){
//   if(obj == null) return obj + ''
//   let reg = /^\[object ([a-zA-Z0-9]+)\]$/i,type
//   /^(object|function)$/i.test(typeof obj) ? 
//   type = reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase() : type = typeof obj 
//   return type
// }
// const checkType = function checkType(obj){
//   if (obj == null) return obj +''
//   let reg = /^\[object ([a-zA-Z0-9]+)\]$/i,type = typeof obj
//   type =  /^(object|function)$/i.test(type) ? 
//          reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase() : type
//   return type
// } 

// 深浅拷贝

let objClone = {
  name: 'beijing',
  age: 77,
  open: true,
  0: null,
  1: undefined,
  2: Symbol(),
  arr: ['foo', 'bar'],
  detail: {
    address: '北京',
    phone: '1234567890'
  },
  3: /^\d+$/,
  4: new Date(),
  5: new Error(),
  6: 10n,
  fn: function () {
    console.log('哈哈');
  },
  body: document.body
};
// const checkType = function checkType(obj) {
//   if (obj == null) return obj + ''
//   let reg = /^\[object ([a-zA-Z0-9]+)\]$/i,
//       type = typeof obj,
//       isObjorFunc = /^(object|function)$/i.test(type)
//   type = isObjorFunc? reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase() : type
//   return type
// }

// const checkType = function checkType(obj) {
//   if(obj == null) return obj + ''
//   let reg = /^\[object ([a-zA-Z0-9]+)\]$/i,
//       type = typeof obj,
//       isObjorFunc = /^(object|function)$/.test(type)
//   type = isObjorFunc? reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase() : type
//   return type
// }
// console.log(checkType(/^$/))
// console.log(checkType(document.querySelector('button')))



//检测是否是纯粹对象 直属类是Object || Object.create(null)
const isPlainObject = function isPlainObject(target) {
  let proto,//target的原型
    Ctor
  if (!target || Object.prototype.toString.call(target) !== '[object Object]') return false
  proto = Object.getPrototypeOf(target)
  if (!proto) return true
  Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor
  let ObjectFunctionString = Function.prototype.toString.call(Object); //"function Object() { [native code] }"
  return typeof Ctor === "function" && Function.prototype.toString.call(Ctor) === ObjectFunctionString
}

const isWindow = function isWindow(obj) {
  return obj != null && obj === obj.window
}

const isArrayLike = function isArrayLike(obj) {
  if (obj == null) return false
  if (typeof obj !== 'object') return false
  let length = !!obj && "length" in obj && obj.length,
    type = checkType(obj)
  if (isWindow(obj)) return false //window对象上是有length属性的 记录iframe标签的个数
  return type === 'array' || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj
}

// 迭代数组/类数组/对象
const each = function each(target, callback) {
  if (typeof callback !== 'function') callback = Function.prototype
  let i = 0,//记录循环的次数
    len,//数组的长度
    item,//target的每一项
    keys,//如果target是对象 存放 对象key的列表
    key;//如果target是对象 对象的某一个key
  if (isArrayLike(target)) {
    len = target.length
    for (; i < len; i++) {
      item = target[i]
      if (callback.call(target, item, i) === false) break
    }
  } else {
    keys = Object.keys(target)
    if (typeof Symbol !== 'undefined') keys = keys.concat(Object.getOwnPropertySymbols(target))
    for (; i < keys.length; i++) {
      key = keys[i]
      item = target[key]
      if (callback.call(target, item, key) === false) break
    }
  }
}
/* const clone = function clone() {
  let target = arguments[0],
      deep = false, //深浅拷贝
      type, // target 的类型
      isArray, // target 是否是数组或者类数组
      isObject, // target 是否是普通对象
      ctor,// 存放 target的构造函数
      result, //假如 target是数组或者对象，用来存放深拷贝后的值
      treated = arguments[arguments.length-1] //为了防止死递归，存放已经处理过的对象
  // 判断第一个参数是否为 boolean
  if (typeof target === 'boolean') {
    if (arguments.length === 1) return target;
    deep = target
    target = arguments[1]
  }

  // 为了防止死递归
  if (!Array.isArray(treated) || !treated.treated) {
    treated = []
    treated.treated = true
  }
  if(treated.includes(target)) return target
  treated.push(target)

  // 特殊值的拷贝
  type = checkType(target)
  isArray = isArrayLike(target)
  isObject = isPlainObject(target)
  if(target == null) return target
  ctor = target.constructor
  // 特殊值拷贝
  if (/^(regexp|date|error)$/i.test(type)) {
    if (type === 'error') target = target.message
    return new ctor(target)
  }
  if (/^(function|generatorfunction)$/i.test(type)) {
    return function proxy(...params){
      return target.call(this, ...params)
    }
  }
  if (target instanceof HTMLElement) {
    return document.createElement(target.localName)
  }
  // 如果不是数组 也不是对象 返回 自己
  if (!isArray && !isObject)  return target 
  
  // 数组和对象的拷贝
  result = isArray ? [] : {}
  each(target, function(val, key){
    if (deep) {
      // 深拷贝
      result[key] = clone(deep,val, treated)
      return
    }
    //浅拷贝
    result[key] = val
  })
  return result
} */


// const clone = function clone() {
//   let target = arguments[0],
//       deep = false,
//       type,
//       ctor,
//       result,
//       treated = arguments[arguments.length - 1]
//   if (typeof target === 'boolean') {
//     if(arguments.length === 1) return target
//     deep = target
//     target = arguments[1]
//   }
//   //处理特殊值
//   if (!Array.isArray(treated) || !treated.treated) {
//     treated = []
//     treated.treated = true
//   }
//   if (treated.includes(target)) return target
//   target.push(target) 
//   // 确定类型
//   type = checkType(target)
//   if (target == null) return target 
//   ctor = target.constructor

//   if (/^(regexp|error|date)$/.test(type)) {
//     if(type === 'error') target = target.message
//     return new ctor(target)
//   }
//   if (/^(function|generatorfunction)$/.test(type)) {
//     return function proxy(...params){
//       return target.call(this, ...params)
//     }
//   }
//   if (target instanceof HTMLElement) {
//     return document.createElement(target.localName)
//   }
//   if(!/^(array|object)$/.test(type)) return target

//   // 数组和对象的拷贝
//   result = type === 'array' ? [] : {}
//   for(let key in target){
//     if (deep) {
//       // 深拷贝
//       result[key] = clone(deep,target[key])
//     }else{
//       result[key] = target[key]
//     }
//   }
//   return result
// }


// const checkType = function checkType(obj) {
//   if(obj == null) return obj + ''
//   let reg = /^\[object ([a-zA-Z0-9]+)\]$/i,
//       type = typeof obj
//       isObjOrFunc = /^(object|function)$/.test(type)
//   type = isObjOrFunc ? reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase():type
//   return type
// }

const checkType = function checkType(obj) {
  if (obj == null) return obj + ''
  let reg = /^\[object ([A-Za-z0-9]+)\]$/i,
    type = typeof obj,
    isObjOrFunc = /^(object|function)$/.test(type)
  type = isObjOrFunc ? reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase() : type
  return type
}


// const clone = function clone() {

//   let target = arguments[0],
//       deep = false,
//       type,
//       ctor,
//       result,
//       treated = arguments[arguments.length - 1]

//   if (typeof target === 'boolean') {
//     if (arguments.length === 1) return target
//     deep = target
//     target = arguments[1] 
//   }

//   if(!Array.isArray(target) || !treated.treated){
//     treated = []
//     treated.treated = true
//   }
//   if (treated.includes(target)) return target
//   treated.push(target)
//   if(target == null) return target
//    //检测target的类型
//   type = checkType(target) 
//   ctor = target.constructor 
//   // 处理特殊值
//   if (/^(regexp|error|date)$/.test(type)) {
//     if(type === 'error') target = target.message
//     return new ctor(target)
//   }
//   if (/^(function|generatorfunction)$/.test(type)) {
//     return function (...params) {
//       return target.call(this, ...params)
//     }
//   }
//   if (target instanceof HTMLElement) {
//     return document.createElement(target.localName)
//   }
//   if(type !== 'array' && type !== 'object') return target

//   //数组和对象的拷贝
//   result = type === 'array' ? [] : {}
//   for(let key in target){
//     if(deep){
//       result[key] = clone(deep, target[key], treated)
//     }else{
//       result[key] = target[key]
//     }    
//   }
//   return result
// }

const clone = function clone() {
  let target = arguments[0],
    deep = false,
    type,
    ctor,
    result,
    treated = arguments[arguments.length - 1]

  if (typeof target === 'boolean') {
    if (arguments.length === 1) return target
    deep = target
    target = arguments[1]
  }
  if (!Array.isArray(treated) || !treated.treated) {
    treated = []
    treated.treated = true
  }
  if (treated.includes(target)) return target
  treated.push(target)
  //特殊值的拷贝
  type = checkType(target)
  if (target == null) return target
  ctor = target.constructor
  if (/^(regexp|error|date)$/.test(type)) {
    if (type === 'error') target = target.message
    return new ctor(target)
  }
  if (/^(function|generatorfunction)$/.test(type)) {
    return function (...params) {
      return target.call(this, ...params)
    }
  }
  if (target instanceof HTMLElement) {
    return document.createElement(target.localName)
  }
  if (type !== 'object' && type !== 'array') return target

  result = type === 'array' ? [] : {}
  for (let key in target) {
    if (deep) {
      result[key] = clone(deep, target[key], treated)
    } else {
      result[key] = target[key]
    }
  }
  return result

}

let newObj = clone(true, objClone)
console.log(newObj);
console.log(newObj.arr === objClone.arr);
console.log(newObj.detail === objClone.detail);
console.log(newObj[4] === objClone[4]);
console.log(newObj[3] === objClone[3]);
console.log(newObj[5] === objClone[5]);
console.log(newObj.body === objClone.body);
console.log(newObj.fn === objClone.fn);


//vue3最长递增连续子序列

const arr = [2, 3, 1, 5, 6, 8, 7, 9, 4]
/* 
2
2 3
1 3 5
1 3 5 6
1 3 5 6 8
1 3 5 6 7 
1 3 5 6 7 9
2 3 5 6 7 9
*/
//默认我们每次放入的时候 我都知道当前的最小的结尾

function getSequence(arr){
  const len = arr.length
  const result = [0] //先默认第0个为参照物
  const p = arr.slice(0) //里面内容无所谓 和原本的数组相同 用来存放索引
  let start
  let end
  let middle
  for(let i = 0; i < len; i++){
    const arr1 = arr[i]
    if (arr1 !== 0) {
      let resultLastIndex = result[result.length - 1]
      if (arr[resultLastIndex] < arr1) {
        p[i] = resultLastIndex
        result.push(i)//当前的值 比上一个人大 直接push 并且让这个人 得记录他的前一个
        continue
      }

      //二分查找 找到比当前值大的那一个
      start = 0
      end = result.length - 1

      while (start < end) { //重合就说明找到了对应的值
         middle = ((start + end) / 2) | 0 //找到中间位置的前一个
        if (arr[result[middle]] < arr1) {
          start = start +1
        }else{
          end = middle
        } //找到结果集中比当前这一项大的数
      }
      //start end 就是找到的位置
      if (arr1 < arr[result[start]]) {
        if (start > 0) { //才需要替换
          p[i] = result[start - 1]
        }
        result[start] = i

      }
      
    }
    
  }
    let lens = result.length //总的个数
    let last = result[lens - 1]
    while (lens-- > 0) { //根据前驱节点一个个向前查找
      result[lens] = last
      last = p[last]
    }
  return result
}
console.log(getSequence(arr));


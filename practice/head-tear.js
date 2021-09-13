


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

const clearTimer = function clearTimer(timer){
  if(timer){
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

const debounce = function debounce(func, wait, immediate){
  if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
  if(typeof wait === 'boolean') immediate = wait
  if(typeof wait !== 'number') wait = 500
  if(typeof immediate !== 'boolean') immediate = false

  let timer = null
  return function operate(...params){
    
    let now = !timer && immediate 
    timer = clearTimer(timer)
    timer = setTimeout(() => {
      timer = clearTimer(timer)
      if(!immediate) func.call(this,...params)
    }, wait)
    if ( now ) func.call(this, ...params) 
  }
}


let btn = document.querySelector(".btn")
const clickFn = function clickFn(e){
  console.log(e,11111111111111)
}
btn.onclick=debounce(clickFn,1000)


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

const throttle = function throttle(func, wait){

  if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
  if(typeof wait !== 'number') wait = 500

  let  timer = null, previous = 0
  return function operate(...params){
    let now = +new Date(), 
        remaining = wait - (now - previous)
        previous = +new Date()
    if(remaining <= 0){
      func.call(this, ...params)
    }else if(!timer){
      timer = setTimeout(() => {
        timer = clearTimer(timer)
        func.call(this, ...params)
        previous = +new Date()
      },remaining)
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


const _new = function _new(Ctor, ...params){

  if(typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a constructor`)
  let name = Ctor.name,
      proto = Ctor.prototype
  if(/^(Symbol|BigInt)$/.test(name) || !proto) throw new TypeError(`${Ctor} is not a constructor`)

  let obj = Object.create(Ctor.prototype)

  let result = Ctor.call(obj, ...params)

  if(result !== null && /^(object|function)$/.test(typeof result)) return result
  return obj
}


let sanmao = new Dog('三毛');
sanmao.sayName();
sanmao.bark();

let sanmao1 = _new(Dog,'三毛111111111')
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

const instance_of = function instance_of(obj, Ctor){
  if(Ctor == null) throw new TypeError('Right-hand side of instanceof is not a object')
  if(typeof Ctor !== 'function') throw new TypeError('Right-hand side of instanceof is not callable')
  if(!Ctor.prototype) throw new Error('Function has non-object prototype undefined in instanceof check')

  if(obj == null || !/^(object|function)$/i.test(typeof obj)) return false

  if(typeof Ctor[Symbol.hanInstance] === 'function') return Ctor[Symbol.hasInstance](obj)

  let prototype = Object.getPrototypeOf(obj)
  while(prototype){
    if(prototype === Ctor.prototype) return true
    prototype = Object.getPrototypeOf(prototype)
  }
  return false
}
console.log(instance_of(/^$/,Array))
console.log(instance_of(/^$/,RegExp))
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

const curry = function currt(func){
  
  if(typeof func !== 'function') throw new TypeError(`${func} is not a function`)
  return function curried(...arg){
    if(arg.length < func.length){
      return function(...args){
        return curried(...arg.concat(args))
      }
    }
    return func.call(this, ...arg)
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

const compose = function compose(...funcs){

  let len = funcs.length
  if( len === 0 ) return x => x
  if( len === 1 ) return funcs[0]
  return function operate(x){
    return funcs.reduceRight((memo,result) => {
      result(memo)
    },x)
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

String.prototype.queryUrlParams = function queryUrlParams(attr){
  attr = attr + ''
  let obj = {}
  this.replace(/#([^#&=?]+)/g,(_, $1) => obj['_HASH'] = $1)
  this.replace(/([^#&=?]+)=([^#&=?]+)/g, (_, $1, $2) => obj[$1] = $2)
  if(attr !== 'undefined') return obj[attr]
  return obj
}

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

Function.prototype.call = function call(context, ...params){
  if(context == null) context = window
  if(!/^(object|function)$/.test(typeof context)) context = Object(context)
  let key = Symbol()
  context[key] = this
  let result = context[key](...params)
  delete context[key]

  return result
}

Function.prototype.apply = function apply(context,params){
  if(context == null) context = window
  if(!/^(object|function)$/i.test(typeof context)) context = Object(context)
  let key = Symbol(),
      result
  context[key] = this
  result = context[key](...params)
  delete context[key]
  return result
}

// Function.prototype.bind = function bind(context,...params){
//   let self = this
//   return function(...args){
//     return self.call(context,...params.concat(args))
//   }  
// }

Function.prototype.bind = function bind(context, ...params){
  
  let self = this
  return function operate(...args){
    return self.call(context,...params.concat(args))
  }
}

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
const checkType = function checkType(obj){
  if (obj == null) return obj +''
  let reg = /^\[object ([a-zA-Z0-9]+)\]$/i,type = typeof obj
  type =  /^(object|function)$/i.test(type) ? 
         reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase() : type
  return type
} 

console.log(checkType([]))





const clearTimer = function clearTimer(timer){
  if(timer){
    clearTimeout(timer)
  }
  return null
}

/**
 * 
 * @param {*} func 需要防抖的函数
 * @param {*} wait 多久时间之内触发多次算是频繁触发  默认值 500
 * @param {*} immediate 触发边界 true 开始边界触发  false 结束边界触发   默认值 false
 */
const debounce = function debounce(func, wait, immediate){

    // 处理参数
    if(typeof func !== 'function') throw new TypeError('func must be an function')
    if(typeof wait === 'boolean') immediate = wait
    if(typeof wait !== 'number') wait = 500
    if(typeof immediate !== 'boolean') immediate = false

    let timer = null
    return function operate(...params) {
      let now = !timer && immediate
      timer = clearTimer(timer)
      timer = setTimeout(() => {
        timer = clearTimer(timer)

        if(!immediate) func.call(this, ...params)

      },wait)
      if ( now ) func.call(this,...params)
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
const throttle = function throttle(func,wait){
  if ( typeof func !== 'function' ) throw new TypeError('func must be an function')
  if ( typeof wait !== 'number' ) wait = 500

  let timer = null,
      previous = 0
  return function operate(...params){
    let now = +new Date(),
        remaining = wait - ( now - previous )
        if ( remaining <= 0 ){
          timer = clearTimer(timer)
          func.call(this, ...params)
          previous = +new Date()
        }else if(!timer){
          timer = setTimeout(() => {
            timer = clearTimer(timer)
            func.call(this,...params)
            previous = +new Date ()
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



const _new = function _new(Ctor, ...params){
  if(typeof Ctor !== 'function') throw new TypeError(`${Ctor} is not a consturctor`)

  let name = Ctor.name,
      proto = Ctor.prototype
  if(/^(Symbol|BigInt)$/i.test(name) || !proto) throw new TypeError(`${Ctor} is not a constructor`)

  let obj = Object.create(proto)
  let result = Ctor.call(obj,...params)

  if(result !== null && /^(object|function)$/i.test(typeof result)) return result
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
const instance_of = function instance_of(obj, Ctor){
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

console.log(instance_of(/^$/,Array))


/**
 * 
 * @param {*} func 需要柯里化的函数
 */
const curry = function curry (func) {
  if (typeof !== 'function') throw new TypeError(`${func} must be a function`)
  rerurn function curriedFn (...args) {
    if(args.length < func.length){
      return function(...argus){
        return curriedFn(...args.concat(argus))
      }
    }
    return func(...args)
  }
}
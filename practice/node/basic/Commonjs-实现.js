/**
 * 在浏览器中全局对象是window
 * 在服务器中全局对象是 global
 * 
*/

// 全局对象意味着可以直接访问，不通过global.xxx
// console.dir(global,{showHidden:true})

//node中有五个属性可以直接访问到 但是 不是 global上的属性

// require module exports __dirname __filename

// console.log(require);
// console.log(module);
// console.log(exports);
// console.log(__dirname);
// console.log(__filename);

//这五个属性都是通过函数的参数传进来的 （node是基于commonJs规范的）

//常用的模块规范 有 ESModule （export import）在node中默认是不支持的

const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id){
  this.id = id //模块里面最重要的两个属性 一个是路径 一个是导出对象
  this.exports = {}
}

Module._wrapper = ['(function(exports,module,require,__dirname,__filename){', '})']

Module._extensions = {
  '.js'(module){
    let script = fs.readFileSync(module.id, 'utf8')
    script = Module._wrapper[0] + script + Module._wrapper[1]
    let fn = vm.runInThisContext(script)
    
    let exports = module.exports //exports 是module.exports的别名
    let dirname = path.dirname(module.id)
    fn.call(exports, exports, module, myRequire, dirname, module.id)
  },
  '.json'(module){
    let jsonString = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(jsonString) //内部会将json赋予到module.exports
  }
}
Module._resolveFilename = function (id) {
  //文件在解析的过程中默认是根据当前执行的路径来做的
  let filePath = path.resolve(__dirname, id)

  //查看文件路径是否存在 如果文件路径存在
  let exists = fs.existsSync(filePath)
  if(exists) return filePath

  //需要尝试给路径添加后缀，策略模式不同的后缀加载策略是不同的
  let exts = Object.keys(Module._extensions)
  for (let i = 0; i < exts.length; i++) {
      let newPath = filePath + exts[i]
      if(fs.existsSync(newPath)) return newPath    
  }
  throw new Error(`${id} module not found`)
}
Module._cache = {} //生成缓存

Module.prototype.load = function (id) {
  let ext = path.extname(id) //找到所属文件的后缀名
  Module._extensions[ext](this)
} 


function myRequire(id){
  // 1.根据用户传入的id 生成一个模块路径，用于缓存
  let modulePath = Module._resolveFilename(id)
  // 2. 生成一个模块路径用于缓存
  let existsModule = Module._cache[modulePath]
  if(existsModule) return existsModule.exports //如果缓存中存在，就用缓存
  //3. 加载模块
  let module = new Module(modulePath)
  Module._cache[modulePath] = module
  module.load(modulePath) //用户会给module.exports赋予结果
  return module.exports //最终就是返回module.exports对象
}
let a = myRequire('./a')
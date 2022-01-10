const path = require('path')
const fs = require('fs') 

// function rmdir(dir, callback) { //串行 将异步串在一起 做操作
//   // 1. 先判断路径的状态，如果是文件删除即可
//   fs.stat(dir, (err, stats) => {
//     if(err) return callback(err)
//     if(stats.isFile()){
//       return fs.unlink(dir, callback)
//     }else{
//       fs.readdir(dir, (err, dirs) => { //readdir 只能读取一层
//         console.log(dirs);
//         dirs = dirs.map(d => path.join(dir, d))
//         console.log(dirs);
//         let index = 0
//         function next() {
//           if (index == dirs.length) return fs.rmdir(dir, callback)
//           let current = dirs[index++]
//           rmdir(current, next)
//         }
//         next()
//       })
//     }
//   })
// }


/**
 * 并发删除
 * 发布订阅
 */
// function rmdir(dir, callback) {
//   fs.stat(dir, (err, stats) => {
//     if(err) return callback(err)
//     if (stats.isFile()) {
//       return fs.unlink(dir, callback)
//     }else{
//       fs.readdir(dir,(err, dirs) => {
//         //readdir 只能读取一层儿子
//         //都完成了删除自己
//         if (dirs.length == 0) {
//           return fs.rmdir(dir, callback)
//         }
//         dirs = dirs.map(d => path.join(dir, d))
//         let idx = 0
//         function done() { //儿子同时删除 删除完毕后 通知我删除自己
//           if (++idx === dirs.length) {
//             fs.rmdir(dir, callback)
//           }
//         }
//         dirs.forEach(dir => {
//           rmdir(dir, done)
//         })
//       })
//     }
//   })
// }


/**
 * 
 * 层序遍历实现倒叙删除
 */
function rmdir(dir, callback) {
  let stack = [dir]
  let index = 0;
  let current;
  while (current = stack[index++]) {
    let stats = fs.statSync(current)
    if (stats.isDirectory()) {
      stack = [...stack, ...fs.readdirSync(current).map(dir => path.join(current, dir))]
    }
  }
  //倒叙删除
}
rmdir(path.resolve(__dirname, 'a'),(a,b) => {
  console.log(a,b);
})












var minWindow = function(s, t) {
  //定义两个指针 两个指针维护一个滑动窗口
  let l = 0
  let r = 0

  //记录需要的字符的数量
  const need = new Map()
  //记录所需要的字符需要多少种类型
  let needType = need.size

  //记录最终的结果
  let res = '' 

  for(let c of t){
      //如果该字符在字典中的数量存在 则数量+1 否则数量设置为1
      need.set(c , need.has(c)? need.get(c) + 1 : 1)
  }

  //右指针移动
  while(r < s.length){
      const c = s[r] //右指针指向的字符
      //如果字典中存在这个字符则将其数量减1
      if(need.has(c)){
          need.set(c, need.get(c) - 1)
          //如果该字符的数量被清0 则我们需要将字符类型的needType减1
          if(need.get(c) === 0) needType--
      }
      
      //如果needType被清0 代表所需要的字符已经都处于滑动窗口内了
      //我们则需要移动左指针
      while(needType === 0){

          //此时在l r窗口内所需要的字符就是我们所需要的字符
          const newRes = s.substring(l, r + 1)
          if(!res || newRes.length < res.length) res = newRes

          const c2 = s[l] //左指针所指向的字符
          //c2如果存在在Map中则需要将其数量加1，并且如果该字符的数量为1则需要将needType++
          if(need.has(c2)){
              need.set(c2, need.get(c2) + 1)
              if(need.get(c2) === 1) needType++
          }
          l++
      }
      r++
  }
  return res
};
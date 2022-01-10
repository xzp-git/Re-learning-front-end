const path = require('path')

console.log(path.resolve('a.js'));

//运行webpack的时候会在当前运行的目录下查找配置文件 cwd（） 返回的是一个绝对路径
console.log(process.cwd());
console.log(process.env.NODE);



console.log(1);
async function async () {
    console.log(2);
    // await 一个结果代码会被延迟到下一个队列中
    await console.log(3); // Promise.resolve(console.log(3)).then(()=>{console.log(4)})
    console.log(4)
}
setTimeout(() => { // 最后执行的
    console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => { // new Promise会立即执行
    console.log(6); // 6
    resolve(7)
})
promise.then(res => {
    console.log(res)
})
async (); // async执行就是让这个函数立即执行 
console.log(8);

//1 6  2 3  8 7 4 5

// 微 7 4          宏 5


async function async1() {
    console.log('async1 start');
    await async2(); // async2().then(()=>'async1 end')  // Promise.resolve(async2()).then(()=>'async1 end')
    console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

// script start  async1 start  async2  promise1  script end  async1 end  promise2  setTimeout

//  微 async1 end  promise2              宏 setTimeout




Promise.resolve().then(() => { // then1
  console.log('then1');
  Promise.resolve().then(() => { 
     console.log('then1-1');
      // promise A+ 规范中定义了 then中返回了一个promoise 那么会采用这个promise的状态， 在ECMAScript中 如果返回一个promise那么会生成一个微任务，保证这个promise一定是异步执行
     return Promise.resolve();  // Promise.resolve().then(()=>{}).then(()=>{}) 
 }).then(() => { // then1-2 要等待 then1-1 完成了 才能调用
     console.log('then1-2')
 })
})
.then(() => { 
 console.log('then2');
})
.then(() => {
 console.log('then3');
})
.then(() => {
 console.log('then4');
})
.then(() => {
 console.log('then5');
})

// then1 then1-1 then2 then3  then4  then1-2 then5

//微 then1 
//微 then1-1 then2
//微 Ecma自带的优化微任务  then3
//微 then1-1的resolve微任务 then4 
//微 then1-2 then5




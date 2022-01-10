const fs = require('fs')


function after(times, callback) {
  let data = {}
  return function finish(key, value) {
    data[key] = value
    if (Reflect.ownKeys(data).length == times) {
      callback(data)
    }
  }
}

let finish = after(2, (school) => { 
  console.log(school);
})

fs.readFile('./name.txt', 'utf-8', function (err, data) {
  finish('name',data)
})


fs.readFile('./age.txt', 'utf-8', function (err, data) {
  finish('age',data) 
})



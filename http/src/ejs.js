const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, 'template.html')

function renderFile(filePath, data, cb) {
  let templateStr = fs.readFileSync(filePath, 'utf-8')
  //正则默认是贪婪的 加？ 表示找最近的
  let head = 'let str = ``;\r\nwith(obj) {'
  head += 'str+=`'
  templateStr = templateStr.replace(/<%=(.+?)%>/g, function () {
    return '${'+arguments[1]+'}'
  })
  head += templateStr.replace(/<%(.+?)%>/g, function() {
      return '`\r\n' + arguments[1] + '\r\nstr+=`'
  });
  head += '`\r\n}\r\nreturn str'
  let fn = new Function('obj', head);
  let result = fn(data);
  return cb(null, result);
}


renderFile(filePath, {dirs:['a', 'b', 'c', 'd']}, function(err, data){
  console.log(data);
})
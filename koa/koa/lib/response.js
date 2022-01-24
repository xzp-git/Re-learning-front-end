const response = {
  _body: undefined,
  get body() {
      return this._body
  },
  set body(content) {
      // 如果用户修改了body属性那么就会更改状态码为200
      this.res.statusCode = 200;
      this._body = content;
  }
};


// vue2 的代理



module.exports = response
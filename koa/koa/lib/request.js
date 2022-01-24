const url  = require('url')
const request = {
  get url(){
    return this.req.url
  },

  get path(){
    let {pathname} = url.parse(this.req.url)

    return pathname
  },

  get query(){
    let {pathname, query} = url.parse(this.req.url, true)
    return query
  }
}


module.exports = request
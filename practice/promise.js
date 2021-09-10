(function(){
  function Promise(executor){
    var self = this
    if(typeof executor !== 'function') throw new TypeError('Promise resolver' + executor + 'is not a function')
    if(self instanceof Promise) throw new TypeError('undefined is not a promise')
    self.state = 'pending'
    self.value = undefined
    self.onfulfilledCallbacks = []
    self.onrejectedCallbacks = []
  }
})()
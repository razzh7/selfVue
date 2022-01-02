//订阅者
function Watcher(vm,key,updcb) { //实例化对象，键名，更新的回调函数
  this.vm = vm;
  this.key = key;
  this.updcb = updcb;
  this.value = this.get();  //获取要监听的属性值
}
Watcher.prototype.get = function() {
  Dep.target = this;
  let value = this.vm.$data[this.key];
  // this.value = this.vm.$data[this.key]; //获取属性值（也会被observe劫持,将该实例放到订阅器subs队列中），存到this.value中
  Dep.target = null; //订阅完成后清空Dep.target
  return value;
}
Watcher.prototype.updated = function() {
  this.run();
}
Watcher.prototype.run = function() {
  var newValue = this.vm.$data[this.key];
  var oldValue = this.value;
  if(oldValue !== newValue) {
    oldValue = newValue;
    this.updcb.call(this.vm,newValue);
  }
}
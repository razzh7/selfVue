function defineReactive(obj,key,val) {
  if(typeof val === Object) {
    Observe(val); //继续递归，查看obj相应属性下是否还存在对象
  }
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      if(Dep.target) { //如果Dep.target指向wacther，往subs添加watcher实例对象，其他时候调用get直接返回val
        dep.addsub(Dep.target);
      }
      return val;
    },
    set: function reactiveSetter(newValue) {
      if(newValue === val) {
        return;
      }
      val = newValue;
      console.log(`属性${key}已经被监听，现在值为${newValue}`);
      dep.notify(); //如果数据变化，通知所有订阅者
    }
  })
}

function Observe(value) {
  /**
   * walk方法将每一个属性都加上getter和setter,来侦听数据变化
   * 只在value是对象时调用
   */
  if(value && typeof value === 'object') {
    walk(value)
  }
}

function walk(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj,key,obj[key]);
  })
}

//消息订阅器
function Dep() {
  this.subs = [];
}
Dep.prototype.addsub = function(wacther) {
  this.subs.push(wacther);
}
Dep.prototype.notify = function() {
  this.subs.forEach(sub => {
    sub.updated();
  })
}


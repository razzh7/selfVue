function defineReactive(obj,key,val) {
  Observe(val); //继续递归，查看obj相应属性下是否还存在对象
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

function Observe(obj) {
  if(obj && typeof obj === 'object') {
//Object.keys遍历obj的目的在于defineReactive需要使用key值来访问obj下相应的属性
    Object.keys(obj).forEach(key => {
      defineReactive(obj,key,obj[key]);
    })
  } else {
    return; //递归出口
  }
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


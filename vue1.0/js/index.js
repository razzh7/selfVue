function Vue(data,el,key) {
  this.$data = data;
  this.proxyData(data);
  el.innerHTML = this.$data[key]; //初始化模板
  Observe(data); //监听$data下的所有属性
  new Watcher(this, key, function(newValue) {
    el.innerHTML = newValue;
  })
};

//Vue代理$data
Vue.prototype.proxyData = function(data) {
//遍历vm.$data，获取key
  Object.keys(data).forEach(key => {
    Object.defineProperty(this,key, { //vm.$data.brand -> vm.brand
      get() {
        return this.$data[key];
      },
      set(newValue) {
        this.$data[key] = newValue;
      }
    })
  })
};


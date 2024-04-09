class EventBus {
  map = {};

  // 监听事件的实现
  $on(eventName /*事件名*/, callback /*回调函数*/) {
    // 从map属性中获取eventName所对应的值
    if (!this.map[eventName]) {
      //如果为undefined就设置为空数组
      this.map[eventName] = [];
    }
    // 将每一个回调函数都放在这个数组中
    this.map[eventName].push(callback);
  }

  // 触发事件的实现
  $emit(eventName, value) {
    // 从map属性中获取eventName所对应的值
    if (!this.map[eventName]) {
      return; //如果为空，没有监听过该事件名，就不需要处理
    }
    // 如果eventName所对应的值不为空，那就是一个数组，数组里存放的是该事件对应回调函数。
    // 对这个数组进行遍历，把每一个回调函数调用起来，并传入参数。
    this.map[eventName].forEach((callback) => callback(value));
  }

  // 移除事件监听的实现
  $off(eventName, callback) {
    //参数为空
    if (!eventName) {
      this.map = {};
    }
    //只有eventName, 移除这个事件的所有监听
    else if (!callback) {
      delete this.map[eventName];
    }
    // eventName,callback都有值, 移除这个事件指定的监听
    else {
      this.map[eventName] = this.map[eventName].filter((item) => item !== callback);
    }
  }
}

const eventBus = new EventBus();
export default eventBus;

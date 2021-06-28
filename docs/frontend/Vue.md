# Vue

## **自检清单**

1. 第一个层次：使用

   - vue 的生命周期

   - vue 全家桶使用，vuex，vue-router

   - data，computer，watcher 使用

   - 组件通信

     - provide / inject

       <!--to do: 今天看到说最好不要用inject-->

     - pros emit

     - ![img](https://juejin.im/equation?tex=attr)listen

     - event bus

     - 自行实现 dispatch 和 broadcast 方法

2. 第二层：原理

   - 如何简单实现一个`mvvm`模型

   - new vue 时候发生什么，每个生命周期对应的源码做了什么

   - data，watcher，computer 的源码实现

   - nextTick 的原理

   - 指令的本质

   - vue 的性能优化

   - Diff 本质

3. 第三层：组件的实现

## 生命周期

Vue 实例从创建到销毁的过程

### 生命周期函数 hook

[源码解读](https://juejin.cn/post/6844903879100858382#heading-14)

1. beforeCreate

   new Vue() 之后触发的第一个 hook。

2. Created

   可以使用、更改数据，但是更改不会触发 updated；此阶段无法与 DOM 进行交互。

3. beforeMount

   template 模板导入模板函数编译。

4. mounted

   DOM 挂载完毕，数据完成双向绑定，使用`$ref`对 DOM 进行操作。

5. beforeUpdate

   可以在当前阶段进行更改数据，不会造成重渲染。

6. Updated

   DOM 已完成更新。

7. beforeDestroy

   可以在这时进行善后收尾工作，比如清除计时器。

8. Destroyed

   实例销毁。

## 对 MVVM 的理解

Model-View-ViewModel (MVVM)

- **Model** 层：代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑。我们可以把 Model 称为数据层，因为它仅仅关注数据本身，不关心任何行为。

- **View 层**: 用户操作界面。当 ViewModel 对 Model 进行更新的时候，会通过数据绑定更新到 View。

- **ViewModel** 层：业务逻辑层，View 需要什么数据，ViewModel 要提供这个数据；View 有某些操作，ViewModel 就要响应这些操作，所以可以说它是 Model for View。

**总结** ：MVVM 模式简化了界面与业务的依赖，解决了数据频繁更新。MVVM 在使用当中，利用<u>双向绑定</u>技术，使得 Model 变化时，ViewModel 会自动更新，而 ViewModel 变化时，View 也会自动变化。

**Vue 实例：**

1. View 层

```html
<div id="app">
  <p>{{message}}</p>
  <button v-on:click="showMessage()">Click me</button>
</div>
```

2. ViewModel 层

```js
var app = new Vue({
  el: '#app',
  data: {
    // 用于描述视图状态
    message: 'Hello Vue!',
  },
  methods: {
    // 用于描述视图行为
    showMessage() {
      let vm = this;
      alert(vm.message);
    },
  },
  created() {
    let vm = this;
    // Ajax 获取 Model 层的数据
    ajax({
      url: '/your/server/data/api',
      success(res) {
        vm.message = res;
      },
    });
  },
});
```

3. Model 层

```js
{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.baidu.com"
    }
}
```

## vue-router 与 location.href 的区别

vue-router 使用 pushState 进行路由更新；location.href 会触发浏览器，页面重新加载

vue-router 使用 diff 算法，按需加载

vue-router 是路由跳转或同一个页面跳转

vue-router 是异步加载`this.$nextTick(()={url})`

## diff 算法

<!--to do-->

## 为什么 Vue 组件中的 data 是一个函数原理(详细易懂)

### v-if 和 v-show 的区别

v-if 会导致重绘

v-show 是 tab/勾选（频换切换

link

import

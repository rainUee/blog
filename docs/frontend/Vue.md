# Vue

## 自检清单

1. 第一个层次：使用

   - vue 的生命周期

   - vue 全家桶使用，vuex，vue-router

   - data，computer，watcher 使用

   - 组件通信

     provide / inject

     <!--TODO: 今天看到说最好不要用inject-->

     pros emit

     ![img](https://juejin.im/equation?tex=attr)listen

     event bus

     自行实现 dispatch 和 broadcast 方法

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

![lifecycle](https://v3.cn.vuejs.org/images/lifecycle.svg)

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

### activated 和 deactivated 函数

```html
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

`keep-alive`包裹动态组件时，会缓存

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

## v-if 和 v-show 的区别

- v-if: 每次都会重新删除或创建元素来控制 DOM 结点的存在与否

  v-if 会导致重绘

- v-show: 是切换了元素的样式，`dispaly:none` `display:block`

  使用场景：tab/勾选（频换切换

## 为什么 Vue 组件中的 data 是一个函数

当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

简而言之，就是 data 中数据可能会被复用，要保证不同组件调用的时候数据是相同的。

## nextTick

当我们修改`State`会重新渲染真实 DOM，而这一步操作实际上是异步的。当我们修改`State`，它会把数据的改变缓存进一个队列当中，当一个`tick`（可以把宏任务和微任务阶段都当成一个`tick`）结束时，再渲染真实的 DOM。

如果我们需要在代码中获取更新后的 DOM 的值，需要使用`this.$nextTick`

## diff 算法

<!--TODO:-->

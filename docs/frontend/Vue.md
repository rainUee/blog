---
title: Vue
order: 5
---

## 自检清单

1. 第一个层次：使用

   - vue 的生命周期

   - vue 全家桶使用，vuex，vue-router

   - data，computed，watcher 使用

   - 组件通信

     provide / inject

     <!--TODO: 今天看到说最好不要用inject-->

     pros emit

     ![img](https://juejin.im/equation?tex=attr)listen

     event bus
     <!-- TODO: 不会！ -->

     自行实现 dispatch 和 broadcast 方法

2. 第二层：原理

   - 如何简单实现一个`mvvm`模型

   - new vue 时候发生什么，每个生命周期对应的源码做了什么

   - data，watcher，computed 的源码实现

   - nextTick 的原理

   - 指令的本质

   - vue 的性能优化

   - Diff 本质

3. 第三层：组件的实现

## 生命周期

Vue 实例从创建到销毁的过程

[lifecycle](https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

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

activated

keep-alive 组件激活时调用，该钩子在服务器端渲染期间不被调用。

deactivated

keep-alive 组件停用时调用，该钩子在服务器端渲染期间不被调用。

```html
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

`keep-alive`包裹动态组件时，有条件的实现缓存，组件切换时不会对当前组件进行卸载。

[keep-alive 的使用原理](https://juejin.cn/post/6979853847007068197)

<!-- TODO: 怎么使用 keep-alive https://juejin.cn/post/6844903713010614280 -->

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

## 组件通信

- Props
- emit
- Provider / Inject
- $emit / $on
- EventBus

## Vue 双向绑定原理

1. Vue2 双向绑定原理：

Vue2 使用的双向绑定核心原理是基于数据劫持和发布-订阅模式。Vue2 的双向绑定分为两部分：数据劫持（通过 Object.defineProperty()） 和 Watcher 类。

- 数据劫持：Vue2 使用 Object.defineProperty() 方法劫持数据对象的属性，对属性的 getter 和 setter 进行拦截。当属性值被访问或修改时，会触发 getter 和 setter，实现数据的响应式。
- Watcher 类：Watcher 用于订阅数据变化和更新视图。每个数据属性都有一个 Watcher 实例，当数据发生变化时，触发 setter，并通知 Watcher，然后 Watcher 会调用其更新函数，将新值应用到 DOM。

2. Vue3 双向绑定原理：

Vue3 的双向绑定原理基于 Proxy 和 Reflect。Vue3 使用 Proxy 对象对数据进行代理，而不是像 Vue2 那样使用 Object.defineProperty() 进行数据劫持。

- Proxy：Vue3 使用 Proxy 对象创建一个数据代理，当代理对象的属性被访问或修改时，会触发 Proxy 的拦截器函数（如 get 或 set），实现数据的响应式。
- Reflect：Vue3 使用 Reflect API 进行对象操作，如获取属性值、设置属性值等。Reflect API 提供了一种更简洁、安全的方法来操作对象，同时具有更好的性能。

## Vue 如何监测数组变换

push, pop, shift, unshift, sort, splice, reverse

**为什么要对数组进行单独处理**

在 Vue 现有阶段中，对响应式处理利用的是 Object.defineProperty 对数据进行拦截，而这个方法并不能监听到数组内部变化，数组长度变化，数组的截取变化等，所以我们需要对这些操作进行 hack，让 vue 能监听到其中的变化。

所以 Vue 重写了数组中方法，首先获取到这个数组的**ob**，也就是它的 Observer 对象，如果有新的值，就调用 observeArray 继续对新的值观察变化，然后手动调用 notify，通知渲染 watcher，执行 update

[官方文档](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

## v-model

v-model 来做表单双向数据绑定，v-model="msg"实则是 :value="msg" @input="msg = $event.target.value"的语法糖。

所以 v-model 指令同时做了两件事：

1. 监听 input 输入事件

2. 将输入的值绑定到对应数据上

## vue-router 与 location.href 的区别

vue-router 使用 pushState 进行路由更新；location.href 会触发浏览器，页面重新加载

vue-router 使用 diff 算法，按需加载

vue-router 是路由跳转或同一个页面跳转

vue-router 是异步加载`this.$nextTick(()={url})`

<!-- TODO: history 和 hash -->

## 前端路由 history 和 hash

hash 模式：监听浏览器地址 hash 值（# 以及后的字符）变化，执行相应 js 切换网页

history 模式： 利用 history API 实现 url 地址改变，网页内容改变

## v-for 中为什么要使用 key

添加唯一标识，高效地更新虚拟 DOM

DOM diff

## v-if 和 v-show 的区别

- v-if: 每次都会重新删除或创建元素来控制 DOM 结点的存在与否

  v-if 会导致重绘

- v-show: 是切换了元素的样式，`dispaly:none` `display:block`

  使用场景：tab/勾选（频换切换

## Vue实例是怎么拿到data属性的

准备：Vue 会遍历 data 对象（如果是 Function 类型，Vue 会先调用函数，创建对应对象），并将所有属性通过 Object.defineProperty() 转换成 getter/setter 。
collect as dependency：每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖。
notify：当 setter 被触发时，会通知 watcher。
trigger re-render：watcher 重新渲染关联的组件。
touch：如果实例修改 data 属性的值，将会触发 setter。

![Vue 实例的 data 属性]https://www.codenong.com/js559c40c8ecd0/

```js
// Object 类型 data 属性
const vm = new Vue({
  data: {
    name: 'Vue'
  }
})

// Function 类型 data 属性
const component = Vue.extend({
  template: '<p>My name is {{ name }}</p>',
  data: function () {
    return {
      name: 'Vue',
    }
  }
})
```

## 为什么 Vue 组件中的 data 是一个函数

当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

简而言之，就是 data 中数据可能会被复用，要保证不同组件调用的时候数据是相同的。

## nextTick

当我们修改`State`会重新渲染真实 DOM，而这一步操作实际上是异步的。当我们修改`State`，它会把数据的改变缓存进一个队列当中，当一个`tick`（可以把宏任务和微任务阶段都当成一个`tick`）结束时，再渲染真实的 DOM。

如果我们需要在代码中获取更新后的 DOM 的值，需要使用`this.$nextTick`

## nextTick的原理

Vue 的 `nextTick` 函数是一个非常实用的工具方法，它允许我们在 DOM 更新完成后延迟执行一个回调函数。这在某些情况下非常有用，例如当你需要在数据变化后操作 DOM 元素时。接下来我们来详细了解 `nextTick` 的原理。

Vue 中的数据变化是异步的。当数据发生变化时，Vue 不会立即更新 DOM，而是将更新任务推入一个队列。在同一事件循环中发生的所有数据变化都会被加入到这个队列中。在下一个事件循环（也就是下一个 "tick"）开始时，Vue 会清空队列，并批量执行 DOM 更新。这种机制可以避免不必要的 DOM 更新，从而提高性能。

`nextTick` 的作用就是在这个队列清空并且 DOM 更新完成后，执行我们传给它的回调函数。这样我们可以确保回调函数在 DOM 更新后执行，让我们可以安全地操作已经更新过的 DOM 元素。

为了实现 `nextTick`，Vue 使用了一个任务队列和一种任务调度策略。具体实现取决于浏览器支持的 API。Vue 首选使用 `Promise.then()`、`MutationObserver` 或 `setImmediate` 进行异步调度。如果浏览器不支持这些 API，Vue 会退回到使用 `setTimeout(fn, 0)`。

总结，`nextTick` 的原理是基于 Vue 的异步更新队列和任务调度策略。通过使用 `nextTick`，我们可以在 DOM 更新完成后执行回调函数，确保在操作 DOM 时，数据已经被更新。

## keep-alive

`keep-alive` 是 Vue 中的一个内置组件，它用于缓存组件的状态以提高性能。当我们在不同组件之间切换时，通常组件会被销毁并重新创建。然而，在某些情况下，我们可能希望保留组件的状态，以避免不必要的重新渲染。这时，我们可以使用 `keep-alive` 组件来实现这个目的。

以下是关于 `keep-alive` 的一些关键点：

1. 缓存组件：将组件包裹在 `keep-alive` 标签内，可以使其状态得到缓存。当组件被切换时，它不会被销毁，而是被缓存起来。当组件重新被激活时，它的状态会被恢复，而不是重新创建。
2. 生命周期钩子：当组件被 `keep-alive` 包裹时，组件的生命周期钩子会发生变化。组件在被激活和停用时，分别触发 `activated` 和 `deactivated` 生命周期钩子。这使得我们可以在这两个钩子函数中执行一些特定的逻辑，如获取数据或重置状态。
3. 包含和排除组件：`keep-alive` 组件提供了 `include` 和 `exclude` 属性，允许我们有选择地缓存特定的组件。我们可以通过组件名称或正则表达式来指定要缓存的组件。
4. 缓存策略：`keep-alive` 还提供了一个 `max` 属性，允许我们设置缓存组件的最大数量。当缓存组件的数量超过这个限制时，最早的组件会被销毁。

总结：`keep-alive` 是 Vue 的内置组件，用于缓存组件状态以提高性能。通过将组件包裹在 `keep-alive` 标签内，我们可以在不同组件之间切换时保留它们的状态。`keep-alive` 还提供了一些属性来控制缓存行为，如包含和排除组件、设置缓存最大数量等。同时，`keep-alive` 影响了组件的生命周期钩子，引入了 `activated` 和 `deactivated` 钩子。

## diff 算法

1. Vue2 diff 算法：

Vue2 的 diff 算法主要通过同级节点之间的比较来进行。在对比新旧虚拟节点时，它采用双端比较的策略。首先分别比较新旧虚拟节点树的头部和尾部节点，通过四种可能的情况进行节点的移动、删除和创建。具体步骤如下：

- 如果新旧头部节点相同，将两个头部节点向后移动。
- 如果新旧尾部节点相同，将两个尾部节点向前移动。
- 如果旧头部节点和新尾部节点相同，将旧头部节点移动到尾部。
- 如果旧尾部节点和新头部节点相同，将旧尾部节点移动到头部。
- 如果以上四种情况都不满足，Vue2 会创建一个新的 key 到 index 的映射表，然后遍历新的子节点，查找旧节点中- 是否存在相同的 key。如果找到相同的 key，将旧节点移动到正确的位置。否则，创建一个新节点并插入到正确的位置。最后，删除旧节点中未匹配的节点。

2. Vue3 diff 算法：

Vue3 的 diff 算法在 Vue2 的基础上进行了优化。Vue3 利用了静态节点和动态节点的概念，通过对静态节点进行跳过，减少了不必要的比较。此外，Vue3 对于静态节点和动态节点的处理也进行了优化。在处理动态节点时，Vue3 使用了一个名为 lis（Longest Increasing Subsequence，最长递增子序列）的算法，通过查找最长递增子序列，找到需要移动的最少节点数量，从而减少节点移动操作，提高性能。

总结：Vue 的 diff 算法用于比较新旧虚拟节点树的差异，从而实现高效的 DOM 更新。Vue2 和 Vue3 的 diff 算法都基于 Snabbdom 库，采用双端比较策略。Vue3 在 Vue2 的基础上进行了优化，引入了静态节点和动态节点的概念，通过跳过静态节点的比较和使用 lis 算法减少节点移动操作，提高了性能

Vue 3 使用了虚拟 DOM (Vdom)，并采用深度优先遍历 (Depth-First Traversal) 来进行比较和更新。这种遍历方式沿着每个分支尽可能深地遍历节点树，然后回溯。

当渲染一个新的视图时，Vue 3 会创建一颗新的虚拟 DOM 树并将其与旧的虚拟 DOM 树进行比较。这一比较过程通过深度优先遍历实现，从而找出两棵树之间的差异，然后将这些差异应用到实际的 DOM 树上，从而有效地更新视图。

深度优先遍历可以更容易地检测具体子树的更改，这对于在更新过程中维护组件的状态和生命周期很重要。这也与 React 的 diff 算法相似，都是倾向于采用深度优先遍历。

<!--TODO: https://juejin.cn/post/6978423272064942110-->

## computed、$watch、methods 的区别

1. computed 是计算值，只有值发生变化才会执行方法，watch 是监听观察动作，有改变就执行
2. computed 具有缓存性，数据变化时先读取缓存，值没变这不做操作，而 watch 没有缓存，直接执行
3. watch 接收两个参数（新，旧）
4. watch 可以在数据变化时做一些异步处理或开销大的操作
5. methods 方法会进行多次执行，重复计算

## Vue 2.x 对比 Vue 3.0

1. 性能优化：
Vue 3 在内部进行了许多性能优化，包括重写了虚拟DOM，提高了渲染性能。
Vue 3 的编译器生成更优化的渲染函数代码，减少了运行时的工作量。
新的响应式系统减少了内存开销。

2. Composition API：
Vue 3 引入了 Composition API，这是一种更灵活和可组合的方式来组织和重用组件逻辑，使得代码更具可维护性和可测试性。
Composition API 允许将相关代码组织到功能性组合中，而不是按照选项（data、methods、computed）的方式组织。

3. TypeScript 支持：
Vue 3 在内部使用 TypeScript 编写，提供了更好的 TypeScript 类型支持。
TypeScript 用户可以更轻松地推断组件和 Props 的类型，减少了类型错误。

4. Teleport：
Vue 3 引入了 Teleport 特性，允许将组件的内容渲染到DOM中的不同位置，这对于处理模态框、弹出菜单等场景非常有用。

5. Fragments：
Vue 3 支持多个根元素，即 Fragments，而 Vue 2 不支持。
这意味着您可以在组件的模板中具有多个顶级元素而无需包装元素。

6. 自定义渲染器：
Vue 3 支持自定义渲染器，允许您将Vue应用程序渲染到不同的目标，例如原生移动应用、命令行、三维场景等。

7. 更好的Tree Shaking支持：
Vue 3 提供更好的 Tree Shaking 支持，使得可以更轻松地剔除不使用的代码。

8. 全局 API 的重构：
Vue 3 的全局 API（如Vue.directive、Vue.filter等）进行了重构，使其更具可扩展性和模块化。

9. 模块化架构：
Vue 3 的模块化架构允许按需加载功能，降低了初始化和加载的成本。

10. 过渡和动画：
Vue 3 引入了新的 <transition> 和 <transition-group> 的 API，以支持更灵活的过渡和动画效果。

在 Vue 2 中，Vue 通过 Object.defineProperty() 来实现响应式系统。当一个对象被传入 Vue 实例进行响应式处理时，Vue 会遍历这个对象的每一个属性，并使用 Object.defineProperty() 把这个属性转换成 getter 和 setter。当这个属性被读取时，getter 会被触发，这个属性就会被添加到依赖中；当这个属性被修改时，setter 会被触发，这个属性的依赖就会被通知，并执行相应的更新操作。这样，当数据被修改时，所有依赖这个数据的地方都会自动更新。

但是，Vue 2 的响应式系统存在一些问题。首先，它只能监听对象的属性，而不能监听新增的属性和删除的属性；其次，它无法监听数组的变化，只能监听数组的索引变化，即当使用数组的 push、pop、shift、unshift、splice 等方法时才能触发更新。

在 Vue 3 中，Vue 引入了 Proxy 对象来实现响应式系统。当一个对象被传入 Vue 实例进行响应式处理时，Vue 会使用 Proxy 对象对这个对象进行代理，这样就可以监听新增的属性和删除的属性，同时也可以监听数组的变化。当一个属性被读取或修改时，Proxy 对象的 get 和 set 方法会被触发，这样就可以实现响应式更新。

论是 Vue 2 还是 Vue 3，都存在一个例外情况：如果使用索引直接设置数组元素，例如 this.items[index] = newValue，Vue 无法检测到这种变动。这是因为这种方式不会触发拦截操作或 Proxy 的监听。为了解决这个问题，Vue 提供了一些特定的方法，如 Vue.set 或 this.$set（在 Vue 2 中）或直接赋值给索引（在 Vue 3 中），以确保 Vue 可以检测到数组元素的变动。

Vue 3 的响应式系统还有一个优点，就是它支持了多个根节点，也就是 Fragment。这样可以在不需要添加额外的 DOM 节点的情况下，返回多个元素。

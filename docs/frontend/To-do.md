# To-do

## flex

`flex: 1`代表`flex-grow: 1`、`flex-grow: 1`、`flex-shrink: auto`

当文本溢出显示省略号时，使用 flex 布局会导致占位较多的子元素去挤压别的子元素。

解决办法：`flex-shrink: 0`

## Vue V.S. React

1. 数据修改，vue 可以直接使用=对数据进行修改，react 需要调用专门的方法
2. 双向绑定：vue 支持双向绑定，无需书写事件，react 需要书写事件才能实现双向绑定
3. 提交事件：vue 可以使用 emit 提交事件，react 需要使用回调函数的方法
4. props：vue 本身支持 props 类型检查默认值等等，react 需要安装额外插件
5. css：vue 可以使用 scoped 关键字实现 css 局部生效，比 react 的 style components 要方便
6. 组件编写：一个 vue 的组件被自然分成 template，script 和 style，结构清晰，react 组件全部都是 js，比较混论
7. 方法绑定：vue 无需绑定方法的 this 指向，就可以直接使用，react 需要手动绑定方法
8. 计算属性，监听器，指令系统可以更方便的对项目进行开发，react 则没有
9. 对 ts 的支持：vue 对 ts 支持不如 react，但 vue3 支持的更好
10. 项目组织：vue 按照操作对数据方法等进行划分，不能很好的按照功能对项目进行划分，但 vue3 解决了。

## 问到的面试题

快排

websocket

React diff 原理

轮播图实现原理

什么时候会触发强缓存

# To-do

## flex

`flex: 1`代表`flex-grow: 1`、`flex-grow: 1`、`flex-shrink: auto`

当文本溢出显示省略号时，使用 flex 布局会导致占位较多的子元素去挤压别的子元素。

解决办法：`flex-shrink: 0`

## Vue V.S. React

1. 数据修改，vue可以直接使用=对数据进行修改，react需要调用专门的方法
2. 双向绑定：vue支持双向绑定，无需书写事件，react需要书写事件才能实现双向绑定
3. 提交事件：vue可以使用emit提交事件，react需要使用回调函数的方法
4. props：vue本身支持props类型检查默认值等等，react需要安装额外插件
5. css：vue可以使用scoped关键字实现css局部生效，比react的style components要方便
6. 组件编写：一个vue的组件被自然分成template，script和style，结构清晰，react组件全部都是js，比较混论
7. 方法绑定：vue无需绑定方法的this指向，就可以直接使用，react需要手动绑定方法
8. 计算属性，监听器，指令系统可以更方便的对项目进行开发，react则没有
9. 对ts的支持：vue对ts支持不如react，但vue3支持的更好
10. 项目组织：vue按照操作对数据方法等进行划分，不能很好的按照功能对项目进行划分，但vue3解决了。

## 问到的面试题

http 长连接
快排
websocket
React diff 原理
状态码304
轮播图实现原理
什么时候会触发强缓存

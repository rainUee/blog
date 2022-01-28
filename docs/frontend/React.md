---
title: React
order: 4
---

## Hook VS Class

- **Hook 使你在无需修改组件结构的情况下复用状态逻辑。**
- Class 每个生命周期常常包含一些不相关的逻辑。**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。
- Class 不能很好的压缩，并且会使热重载出现不稳定的情况。

## Hook

### UseEffect

在函数组件中执行副作用操作，可用于模拟`mounted`、`updated`生命周期钩子。

```js
useEffect(() => {}, []); // 只在挂载时执行
useEffect(() => {}, [count]); // 只在挂载和count改变时执行
useEffect(() => {}); // 在挂载和数据更新时执行
```

[注意](https://zhuanlan.zhihu.com/p/84697185)

<!-- TODO: https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/ -->

## 原理

### 虚拟 DOM

1. 用 JavaScript 对象结构表示 DOM 树的结构，然后构建一个真正的 DOM 树，插入到文档中
2. 当状态变更时，重新构造一棵新的对象树，新旧对比，记录两棵树的差异
3. 把 2 记录的差异应用到 1 所构建的真正 DOM 树上，完成视图的更新。

### Diff 算法

1. 把树形结构按照层级分解，只比较同级元素。
2. 给列表结构的每个单元添加唯一的 key。
3. React 只会匹配相同 class 的 component。
4. 合并操作，调用 component 的 setState 方法时，将其标记为 dirty。到每一个事件循环结束，检查所有标记 dirty 的 component 进行重新绘制。
5. 选择性子树渲染。

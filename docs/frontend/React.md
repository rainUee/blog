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
useEffect(() => {}, []) // 只在挂载时执行
useEffect(() => {}, [count]) // 只在挂载和count改变时执行
useEffect(() => {}) // 在挂载和数据更新时执行
```

[注意](https://zhuanlan.zhihu.com/p/84697185)

<!-- TODO: https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/ -->

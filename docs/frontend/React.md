---
title: React
order: 4
---


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
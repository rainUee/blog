# To-do

## 引用类型

```js

{} === {} // false

```

原因在于，引用类型在比较的时候判断的是引用而不是值。等号两边是两个不同的引用。  
引用数据类型会对比内存地址？

## JavaScript 数组函数

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62700647745a40849c657479c0efc2d3~tplv-k3u1fbpfcp-watermark.image)

## transform 和 animation 的区别

transform：导航的 tab 的切换（只有开始和结束

## 左右盒子

flex/float/grid/table

## 闭包

一个函数可以访问另一个函数作用域下的变量

## 深拷贝和浅拷贝的区别

深拷贝：new 对象

浅拷贝：指针

## cookie 和 session 的区别

1. 保存
2. 保存类型
3. 存储大小

## sessionstorage 和 locastorage

## 节流（多次变为隔一段时间一次）防抖（多次变为最后一次）

## 事件代理

ul 下的 li 需要绑定

ul 代理

## 判断是否为空

typeof

箭头函数

## 宏任务和微任务

## XSS

### 将用户输入的东西作为脚本输出

### 解决办法

过滤输入

转义输出

eval/v-html 可能会导致 xss？

## transition 和 animation 的区别

Animation 和 transition 大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是 transition 需要触发一个事件才能改变属性，而 animation 不需要触发任何事件的情况下才会随时间改变属性值，并且 transition 为 2 帧，从 from …. to，而 animation 可以一帧一帧的。

## 待办

1. foreach 和 map 的区别
   我后来去查 一个可以中断 一个不可以中断
   还有就是一个改变原来数据项 一个不改变原来数据项
   一个返回组成数组 一个不返回新的数组等

2. promise 有什么优缺点
   这个我觉得是 promise 的一个传递性

3. promise 的 then 有两个参数 第一个捕获 resolve 的 第二个是捕获 rejected 的 第二个参数和 promise.catch 的区别 【滴滴面试】

4. async 包裹了的函数和普通函数的区别， 我知道您在讲 async 的时候说这个是一个语法糖 但是具体和普通函数区别其实得看看原理才知道这个是什么区别

5. 还有的面试官问了的前端的 jsonp 如果一直没返回怎么办 这个后来查询是计时器做一个轮询

6. 前端面向对象编程的特点 这个您讲过 只是没具体提这三个概念
   封装 继承 多态

7. 箭头函数的优缺点
   比如不能用 arguments
   不能用作 constructor

8. css 其实还有一些问道我了 不是不会用只是记不住
   css 的选择器的权限 很久之前的哪个表 important 10000 等。。。
   css 的偶数选择器 面试让手写【滴滴面试】

9. 还有 http 中会问 http 协议个 tcp/ip 协议和 UDP 协议

10. get 方法发送数据方式为什么会不安全
    我回答了数据可以直接显示的在请求 url 地址中看到 但是面试官说我讲的不对
    前端如何监听请求完毕的 如果不用 callback 轮询？

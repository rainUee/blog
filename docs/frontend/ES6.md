# ES6

## let 和 const

- var 声明的变量存在变量提升的情况。
- let 所声明的变量，只在let命令所在的代码块内有效。
- const 声明一个只读常量（内存地址不变）。

**顶层对象**，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象

在 ES5  中，顶层对象的属性与全局变量是等价的。

## 解构赋值

```javascript
// 交换变量值 
let x = 1;
let y = 2;

[x, y] = [y, x];

// 用 for...of 遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

## 标签模板

```js
function foo(name) {
  console.log('hi,', name);
}

foo`jack`; // hi, [ 'jack' ]
```

[标签模板](https://es6.ruanyifeng.com/#docs/string#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF)

## Set、Map

- `Set`类似于数组，但是成员的值都是唯一的，没有重复的值。
- `Set`本身是一个构造函数，用来生成 Set 数据结构。

## import、 export

使用`import`取代`require()`

```javascript
// CommonJS 的写法
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// ES6 的写法
import { func1, func2 } from 'moduleA';
```

使用`export`取代`module.exports`

```javascript
// commonJS 的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

module.exports = Breadcrumbs;

// ES6 的写法
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    return <nav />;
  }
};

export default Breadcrumbs;
```

## 三点表达式

## 箭头函数

- 箭头函数没有自己的 this，函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象

- 所以不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误

- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 Rest 参数代替

- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

[ES6](https://es6.ruanyifeng.com/)

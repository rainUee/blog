---
title: JavaScript
order: 3
---

## 基础

### typeof

```js
typeof undefined === 'undefined';
typeof null === 'object';
typeof 123 === 'number';
typeof '123' === 'string';
typeof true === 'boolean';
typeof Symbol() === 'symbol';
typeof 123n === 'bigint';
// 一共七种基本类型，最后一种bigint为新增基本类型
typeof {} === 'object'; //array function null
typeof function () {} === 'function';
```

### 基本类型和引用类型

基本数据类型直接存放在栈。

引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

Boolean、 Number、 String 不是由内置函数 new 出来的
symbol 是 ES6 引入的一种新的原始数据，表示独一无二且不可改变的值。通过 Symbol 函数调用生成，由于生成的 symbol 值为原始类型，所以 Symbol 函数不能使用 new 调用。

### null 和 undefined 的区别

null 表示一个空对象指针

```js
Object.getPrototypeOf(Object.prototype);
// null
```

undefined 表示未定义

1. 变量被声明了，但没有赋值时，就等于 undefined。
2. 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
3. 对象没有赋值的属性，该属性的值为 undefined。
4. 函数没有返回值时，默认返回 undefined。

```js
//检测 null
var a = null;
!a && typeof a === 'object';
```

### 判断 JavaScript 数据类型

`typeof`、`instanceof`、`constructor`、`toString`

#### 判断数组

```js
[] instanceof Array;
[].constructor === Array;
Object.prototype.toString.call([]);
Array.isArray([]);
```

### 作用域

```js
for (var i = 0; i < 5; ++i) {
  setTimeout(() => console.log(i), 0);
}
//5、5、5、5、5
for (let i = 0; i < 5; ++i) {
  setTimeout(() => console.log(i), 0);
}
//0、1、2、3、4
```

1. var 声明的变量存在于上层作用域，不存在于 for 循环的块级作用域；
2. setTimeout 是异步操作；这里涉及到执行的顺序问题，setTimeout 后执行。
3. 代码执行 5 次循环后，i 变量的值变为 5，然后再执行五次 console.log 均打印的是 5
4. var 没有块级作用域，5 个 i 都指向一个内存(变量提升)；let 有作用域只会在循环本轮生效。

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);
//undefined
//{n: 2}
```

### 闭包

能够读取到其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。

<!-- ### 条件运算符

```js
function checkTitle(score) {
  return score < 0 || score > 10
    ? '无效分数'
    : { 6: '秀才', 7: '进士', 8: '探花', 9: '榜眼', 10: '状元' }[~~score] ||
        '秀才';
}
``` -->

### 描述 new 一个对象的过程

- 创建一个新对象
- `this`指向这个新对象
- 执行代码，即对`this`赋值
- 返回`this`

### forEach 和 map 的区别

forEach: 返回值为 undefined，无法中止，可以通过索引来修改原来的数组
map: 返回新数组，callback 需要有 return 值，若没有则返回 undefined

forEach 结合 try...catch() 可以跳出循环

## 数组

修改原数组的方法：

pop、push、shift、unshift、reverse、sort、splice

不改变原数组：

concat、join、slice、map、filter、some、every

### 数组去重

```js
[...new Set(arr)];
```

### 数组扁平化

```javascript
var arr = [1, 2, [3, [4, 5]]];
arr.flat(Infinity);
```

### 数组乱序

```javascript
let arr = [1, 2, 3, 4, 5];
arr.sort(() => {
  return Math.random() - 0.5;
});

// 加强版
// 遍历数组，每一项和该项之前的随机项交换位置
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = ~~(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

~ 相当于按位取反， ~15 等于 -16，即 ~n = -(n+1)

~~ 在处理正数的时候类似于 Math.floor，因为 -(-n-1)-1=n+1-1=n

`Math.floor()`为向下取整

### instanceof

```js
object instanceof constructor;
```

```js
({} instanceof Object); // true
[] instanceof Array; // true
[] instanceof Object; // true
var myNonObj = Object.create(null);
myNonObj instanceof Object; // 返回 false, 一种创建非 Object 实例的对象的方法
```

实现 instanceof

```js
function isInstanceof(a, b) {
  if (typeof a !== 'object' || a === null) return false;
  let proto = Object.getPrototypeOf(a);
  while (true) {
    if (proto === null) return false;
    if (proto === b.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

### 浅拷贝

将一个变量赋值给另一个变量时，基础类型复制的是值，赋值完成两个变量在没有任何关系；而对象类型的复制的是地址，修改一个变量另一个变量也会跟着一起变化。

```js
// Object.assign
let source = {
  name: 'akara',
  age: 20,
};
let target = Object.assign({}, source);

// 扩展运算符
let source = {
  name: 'panther',
  age: 20,
};
let target = { ...source };

// slice
let source = [1, 2, 3];
let target = source.slice();

// concat
let source = [1, 2, 3];
let target = source.concat();
```

浅拷贝复制的是 source 的引用地址，而并非堆里面的值。

### 深拷贝

```js
let a = [0, 1, [2, 3], 4],
  b = JSON.parse(JSON.stringify(a));
a[0] = 1;
a[2][0] = 1;
console.log(a, b);
```

undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略

```js
function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key]);
        } else {
          //如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
let a = [1, 2, 3, 4],
  b = deepClone(a);
a[0] = 2;
console.log(a, b);
```

深拷贝，是拷贝对象各个层级的属性。

## 函数

### 防抖

（多次变为最后一次）

当你触发事件后，如果在 n 秒内，没有再次触发该事件，那么就执行函数；如果在 n 秒内，再次触发了该事件，那么就取消计时器，重新开始计时

- 监听一个输入框，文字变化后触发 change 事件
- 直接用 keyup 事件，则会频繁触发 change 事件
- 防抖：用户输入结束或暂停时，才会触发 change 事件

```js
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
```

### 节流

（多次变为隔一段时间一次）

- 拖拽一个元素时，要随时拿到该元素被拖拽的位置
- 直接用 drag 事件，则会频发触发，很容易导致卡顿
- 节流：无论拖拽速度多快，都会每隔 100ms 触发一次

例如要在文字改变时触发一个 change 事件，通过 keyup 来监听。使用节流。

```js
var textarea = document.getElementById('text');
var timeoutId;
textarea.addEventListener('keyup', function () {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(function () {
    // 触发 change 事件
  }, 100);
});
```

## Promise

[参考](https://es6.ruanyifeng.com/#docs/promise)

### 三种状态

pending fulfilled rejected

链式调用->解决回调地狱

```js
// callback-hell
console.log('start');
$.get('./data1.json', function (data1) {
  console.log(data1);
  $.get('./data2.json', function (data2) {
    console.log(data2);
    $.get('./data3.json', function (data3) {
      console.log(data3);
      $.get('./data4.json', function (data4) {
        console.log(data4);
        // ...继续嵌套...
      });
    });
  });
});
console.log('end');
```

### 实现 promise

```js
// 定义三种状态
const PENDING = 'PENDING'; // 进行中
const FULFILLED = 'FULFILLED'; // 已成功
const REJECTED = 'REJECTED'; // 已失败

class Promise {
  constructor(exector) {
    // 初始化状态
    this.status = PENDING;
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };
    const reject = (reason) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };
    // 立即执行exector
    // 把内部的resolve和reject传入executor，用户可调用resolve和reject
    exector(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    // then是微任务，这里用setTimeout模拟
    setTimeout(() => {
      if (this.status === FULFILLED) {
        // FULFILLED状态下才执行
        onFulfilled(this.value);
      } else if (this.status === REJECTED) {
        // REJECTED状态下才执行
        onRejected(this.reason);
      }
    });
  }
}
```

<!-- TODO: promise 的优缺点 -->

Promise 对象代表了未来将要发生的事件，用来传递异步操作的消息。

#### Promise 的优缺点

将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

[ES6 中的 Promise](http://www.cnblogs.com/wangfupeng1988/p/6515855.html)

### reject 和 catch 处理上有什么区别

reject 用来抛出异常，catch 用来处理异常
reject 是 Promise 的方法，而 then 和 catch 是 Promise 的实例的方法（Promise.prototype.then 和 Promise.prototype.catch）。

(catch 是语法糖)

### Event Loop

任务队列中，在每一次事件循环中， macrotask 只会提取一个执行，而 microtask 会一直提取，知道 microsoft 队列为空为止。

也就是说如果某个 microtask 任务被推入到执行中，那么当主线程任务执行完成后，会循环调动该队列任务重的下一个任务来执行，知道该任务队列到最后一个任务为止，而事件循环每次只会入栈一个 macrotask，主线程执行完成后又会检查 microtask 队列并完成里面的所有任务后再执行 macrotask 任务。

[参考](http://vimeo.com/96425312)

### 宏任务和微任务

微任务和宏任务是异步任务的两个分类。

宏任务：`script` `setTimeOut` `setInterval` `setImmediate`

微任务：`Promise.then` `process` `nextTick` `Object.observe`

```js
setTimeout(function () {
  console.log(1);
}, 0);

new Promise(function (resolve, reject) {
  console.log(2);
  resolve();
})
  .then(function () {
    console.log(3);
  })
  .then(function () {
    console.log(4);
  });

process.nextTick(function () {
  console.log(5);
});

console.log(6);
//输出2,6,5,3,4,1
```

## 算法

洗牌算法

```js
function shuffle(arr) {
  var result = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
}
```

爬楼梯(每次爬 1 或 2 个台阶，爬上 n 阶有几种爬法？)

```js
var climbStairs = function (n) {
  const res = [];
  res[0] = 1;
  res[1] = 2;
  for (let i = 2; i <= n; i++) {
    res[i] = res[i - 1] + res[i - 2];
  }
  return res[n];
};
```

将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

```js
arr = [[3, 12, 1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [14], 13]], 10];
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {
  return a - b;
});
```

使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

```js
arr = [3, 15, 8, 29, 102, 22];
arr.sort();
//[102, 15, 22, 29, 3, 8]
//元素按照转换为的字符串的各个字符的Unicode位点进行排序
arr.sort((a, b) => a - b);
//[3, 8, 15, 22, 29, 102]
```

[实现模糊搜索结果的关键词高亮显示](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/141)

## 前端安全

### 跨站脚本攻击（XSS）

将用户输入的东西作为脚本输出

解决方法：

过滤输入/转义输出

把半角转义为全角

eval/v-html 可能会导致 xss？

eval 将字符串解析成 js 并执行，消耗性能（一次解析，一次执行）

## 面向对象的特点

抽象、继承、多态

## 如何检测浏览器的类型

```javascript
var ua = navigator.userAgent;
var isChrome = ua.indexOf('Chrome');
console.log(isChrome);
```

## 拆解 url 的各部分

```javascript
console.log(location.href);
console.log(location.protocol); // 'http:' 'https:'
console.log(location.pathname); // '/learn/199'
console.log(location.search);
console.log(location.hash);
```

## 一些面试题

编写代码，满足以下条件：
（1）Hero("37er");执行结果为

Hi! This is 37er

（2）Hero("37er").kill(1).recover(30);执行结果为

Hi! This is 37er

Kill 1 bug

Recover 30 bloods

（3）Hero("37er").sleep(10).kill(2)执行结果为

Hi! This is 37er

//等待 10s 后

Kill 2 bugs //注意为 bugs

（双斜线后的为提示信息，不需要打印）

```js
function Hero(name) {
  let o = new Object();
  o.name = name;
  o.time = 0;
  console.log('Hi! This is ' + o.name);
  o.kill = function (bugs) {
    if (bugs == 1) {
      console.log('Kill ' + bugs + ' bug');
    } else {
      setTimeout(function () {
        console.log('Kill ' + bugs + ' bugs');
      }, 1000 * this.time);
    }
    return o;
  };
  o.recover = function (bloods) {
    console.log('Recover ' + bloods + ' bloods');
    return o;
  };
  o.sleep = function (sleepTime) {
    o.time = sleepTime;
    return o;
  };
  return o;
}
```

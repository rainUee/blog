# ES6

## 标签模板

```js
function foo(name) {
  console.log('hi,', name);
}

foo`jack`; // hi, [ 'jack' ]
```

![https://es6.ruanyifeng.com/#docs/string#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF]

## 箭头函数

函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象

不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误

不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 Rest 参数代替

不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

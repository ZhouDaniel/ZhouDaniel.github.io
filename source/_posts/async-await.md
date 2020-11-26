---
title: async await
date: 2020-11-05 16:28:18
tags:异步
---
一 不管async返回的什么，只要在async里面写了return，外部拿到的都是promise对象
```js
async fn() {
    return a
}
console.log(fn()) // promise
```
---
title: Cookie的设置、读取以及是否自动携带问题
date: 2020-10-21 17:11:13
tags: 浏览器
---
这篇文章将解答以下疑问:

能设置或读取子域的cookie吗?
客户端设置cookie与服务端设置cookie有什么区别?
同域/跨域ajax请求到底会不会带上cookie?

## 一 能设置或读取子域的cookie吗?
不行! 只能向当前域或者更高级域设置cookie

例如 client.com 不能向 a.client.com 设置cookie, 而 a.client.com 可以向 client.com 设置cookie

读取cookie情况同上

## 二 客户端设置cookie与服务端设置cookie有什么区别?
论是客户端还是服务端, 都只能向自己的域或者更高级域设置cookie
例如 client.com 不能向 server.com 设置cookie, 同样 server.com 也不能向 client.com 设置cookie

服务端可以设置 httpOnly: true, 带有该属性的cookie客户端无法读取

客户端只会带上与请求同域的cookie, 例如 client.com/index.html 会带上 client.com 的cookie,
server.com/app.js 会带上 server.com 的cookie, 并且也会带上httpOnly的cookie

但是, 如果是向服务端的ajax请求, 则不会带上cookie, 详情见第三个问题

## 三 同域/跨域ajax请求到底会不会带上cookie?
这个问题与你发起ajax请求的方式有关

fetch在默认情况下, 不管是同域还是跨域ajax请求都不会带上cookie, 只有当设置了 credentials 时才会带上该ajax请求所在域的cookie, 服务端需要设置响应头 Access-Control-Allow-Credentials: true, 否则浏览器会因为安全限制而报错, 拿不到响应

axios和jQuery在同域ajax请求时会带上cookie, 跨域请求不会, 跨域请求需要设置 withCredentials 和服务端响应头
#### fetch 设置 credentials
使fetch带上cookie
```js
fetch(url, {
    credentials: "include", // include, same-origin, omit
})
```
+ include: 跨域ajax带上cookie
+ same-origin: 仅同域ajax带上cookie
+ omit: 任何情况都不带cookie
#### axios 设置 withCredentials
使axios带上cookie
```js
axios.get('http://server.com', {withCredentials: true})
```
#### jQuery 设置 withCredentials
```js
$.ajax({
    method: 'get',
    url: 'http://server.com',
    xhrFields: {
        withCredentials: true
    }
})
```
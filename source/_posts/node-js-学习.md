---
title: node.js 学习（初识node.js）
date: 2020-11-16 14:32:15
tags: node.js
---

## 一 下载&安装
#### 1. 普通下载
   点击[官网](http://nodejs.cn/)下载固定的版本

#### 2. nvm安装
nvm是node.js 版本管理工具，可切换多个node.js 版本 
   + mac os，先安装[brew](https://brew.sh/)
 使用`brew install nvm` 安装node
   + windows，github中搜索nvm-windows，有下载地址

验证是否下载成功  
    `node -v`  
    `npm -v`
#### 2.1 使用npm
`nvm list` 查看当前所有版本的node版本  
`nvm install v10.13.0` 安装指定的版本  d
`nvm use --delete-prefix 10.13.0` 切换到指定版本

## 二 node.js 和js的区别
#### 0. ECMAScript
首先先了解ECMAScript ，它定义了语法，js和node.js 都必须遵守，这些语法包括了基本的变量定义，循环，判断，函数，也包括原型和原型链，作用域和闭包
#### 1. js
js是使用了ECMAScript语法规范，外加Web Api，这些api（DOM操作，BOM操作，事件绑定，Ajax等）符合W3C标准，
#### 2. node.js
node.js 是使用ECMAScript语法规范，外加node.js Api(处理http，处理文件等，具体参考[api](http://nodejs.cn/api/))

## 三 模块规范 common.js
common.js 是node.js 默认的模块化规范
```js
// circle.js
const { PI } = Math;
module.exports = function area(r) {
  return PI * r ** 2;
};
```

```js
//test.js
const area = require('./circle.js');
console.log(`半径为 4 的圆的面积是 ${area(4)}`);
```
模块对外暴露接口使用 module.exports，常见的有两种用法：为其添加属性或赋值到新对象
```js
// test.js
// 添加属性
module.exports.prop1 = xxx;
module.exports.funA = xxx;
module.exports.funB = xxx;

// 赋值到全新对象
module.exports = {
  prop1,
  funA,
  funB,
};
```

## 四 调试
#### 1. 安装Debugger for Chrome插件
#### 2. 点击vscode左边的小虫子按钮
#### 3. 点击做上方设置按钮，设置`launch.json`
#### 4. 在运行那一栏添加配置 `Launch Chrome` 然后选择改配置，然后点击绿色按钮运行
#### 5. 启动你想调试的页面 例如：`node index.js`

## 五 server开发和前端开发的区别
1. 服务稳定性
2. 考虑内存和cpu（优化，扩展）
3. 日志记录
4. 安全（越权操作，数据库攻击）
5. 集群和服务拆分（流量承载）


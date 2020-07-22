---
title: iview常用组件
date: 2020-07-02 08:06:13
tags: iview
categories:
- iview
---
## 一 在vue-cli中引入iview
### 1. 安装依赖
```js
npm install iview --save
```
### 2.0 全局引入

在 main.js 文件中写入
```js
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);
```
### 2.1 按需引入
```js
import 'iview/dist/styles/iview.css';
import { Button } from 'iview';
Vue.component('Button', Button);
```
由于把Button注册到vue上了，所以在vue文件可以直接使用，不要引入 了,所以在写vue项目的时候，可能引入的组件比较多，可以把这些按需引入的代码写到一个js里面，在vue的入口文件引入这个js里面，比较好。

### 3 一些坑
1. 使用 Select Option 的组件时,下拉框的位置，总是不固定，会乱跑，
观察：样式问题，查看渲染页面，发现下拉框有absolute定位，而它的父组件却没有定位，
解决： 给父元素增加定位,因为是组件，需要样式渗透的写法
    ```js
    div>>>.ivu-select{
        position:relative;
    }
    ```

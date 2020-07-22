---
title: vue-cli3+ts 项目引入swiper版本问题
date: 2020-07-11 12:59:48
tags: swiper
categories:
- js第三方库
---
## 一 环境
 vue-cli3 + typescript
## 二 操作
1. 因为要用到轮播，所以下载了vue-awesome-swiper@2.6.7版本，对应的是swiper3 
```js
npm install vue-awesome-swiper@2.6.7 --save
```
2. 并在main.js 引入(因为版本问题，css路径可能不一样，可以区node_modules去查找正确的)
```js
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper,);
```

## 三 问题
1. 因为是TS项目，引入此库出现了问题：显示 无法找到模块“vue-awesome-swiper”的声明文件

## 四 解决过程
1. 使用命令npm install `@types/vue-awesome-swiper@2.6.7 --save` 安装，发现不行，这个库没有提供这种方法安装
2. TS 提供了不提供模块的具体的声明文，来导入 JS 库的支持。在 `shims-vue.d.ts` 文件中 写入 `declare module "vue-awesome-swiper"`，这样模块中所有的导入的类型都将是 any 类型。可是发现还是不行
3. 接着把@2.6.7版本的vue-awesome-swiper 卸载，下了最新的 swiper 和 vue-awesome-swiper
    ```js
    npm install vue-awesome-swiper swiper --save
    ```
    终于不报错了。
4. 可是依照官文的写法，轮播页面可以左右拉动，但是按钮点击无反应，也不能自动轮播，观察swiper下的是最新版本的@6.0，遂卸载@6.0 版本，下载@5.3.6版本，终于功能可以正常使用

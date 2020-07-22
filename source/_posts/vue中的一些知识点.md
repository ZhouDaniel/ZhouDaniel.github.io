---
title: vue中的一些知识点
date: 2020-07-18 16:36:59
tags: vue
categories:
- vue
---
## 一 this.$router.replace()
与`this.$router.push()`不同的是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。

## 二 @click.native
给vue组件（包括`router-link`这种）绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符）

## 三 @mouseenter，@mouseleave
vue提供鼠标进入和离开的方法

---
title: typescript
date: 2021-03-24 14:25:28
tags:
---
1 ref
在使用iview的Sider组件时
`this.$refs.side1.toggleCollapse();` 在typescript项目里这样使用会报错，side1上并没有toggleCollapse方法
需要给side1 一个any属性 
```js
public $refs!: {
    side1: any,
    chart: any,
    content: any
  }
```
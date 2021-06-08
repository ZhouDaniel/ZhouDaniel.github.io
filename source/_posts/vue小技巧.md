---
title: vue小技巧
date: 2021-06-08 10:14:55
tags:
---
## router-view设置key
router-view标签是vue路由的出口，当路由跳转时，例如`/page => /page/1 => /page/2`
我们不想让page跳转一次就执行其created mounted，可以把其key设置为某个值，当跳转其底下的`/page/1`和`/page/2`都不会执行created和mounted，如果你想拿数据，可以在路由组件中, 添加beforeRouteUpdate钩子来执行相关方法拉去数据，当跳转其他路由时，把路由设置为`this.$route.path`
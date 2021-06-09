---
title: 一些js注意点
date: 2021-06-09 09:49:57
tags:
---
## 1 for 和 forEach 循环
在forEach中不能使用break，可以使用return，但是使用return不会中断循环，在for循环中会中断循环，如果要让forEach中断循环，需要使用try catch
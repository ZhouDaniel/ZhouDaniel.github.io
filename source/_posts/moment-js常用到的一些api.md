---
title: mement.js用到的一些api
date: 2020-06-27 08:56:25
tags: moment.js
categories:
- js第三方库
---
## 一. moment 介绍
Moment 被设计为在浏览器和 Node.js 中都能工作。

所有的代码都应该在这两种环境中都可以工作，并且所有的单元测试都应该在这两种环境中运行。

## 二. 解析api
### 1. 获取当前的日期和时间
```js
var now = moment(); 
```
### 2. 解析字符串格式 moment(String);
```js
var time = moment("1995-12-25");
var time = moment("1995-12-25","YYYY-MM-DD")
```
### 3. 解析对象 moment(Object)
```js
var time =  moment({ years:'2010', months:'3', date:'5', hours:'15', minutes:'10', seconds:'3', milliseconds:'123'});
```
### 4. 解析数字 moment(Number)
```js
var day = moment(1318781876406);
```
### 5. 解析number数组 moment(Number[]) 
+ [year, month, day, hour, minute, second, millisecond]
```js
moment([2010, 1, 14, 15, 25, 50, 125]); 
```

## 三. 取值，赋值
### 1. millisecond() 
```js
moment().milliseconds(); // 获取到毫秒数
moment().millisecond(Number); // 设置毫秒数，接受 0 到 999 之间的数字。 如果超出范围，则它将会冒泡到秒钟。注意数字要加引号
```
### 2. second() , minute() , hour() , date() , day() , weekday() 同上

## 四. 操作
一旦有了 Moment，则可能需要以某些方式对其进行操作。 有很多方法可以帮助处理此需求。
### 1. add() 通过增加时间来改变原有的moment
```js
moment().add(7, 'days') / moment().add(7, 'd');
//如果要同时增加多个不同的键，则可以将它们作为对象字面量传入。
moment().add(7, 'days').add(1, 'months'); // 链式
moment().add({days:7,months:1}); // 对象字面量
```
### 2. subtract() 通过减去时间来改变原始的 moment。
```js
moment().subtract(1, 'seconds');
```
## 五. 显示
### 1.format
```js
moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601，无小数秒钟)
moment().format("YYYY-MM-DD") // 2020-06-27
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
moment().format("ddd, hA");                       // "Sun, 3PM"
```

### 2. valueOf() 简单地输出自 Unix 纪元以来的毫秒数
```js
var day = moment().format(); 
var nubmer = moment(day).valueOf()
console.log(nubmer); // 819820800000
```
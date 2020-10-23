---
title: 一些js方法
date: 2020-08-04 08:55:35
tags: js
categories:
- js
---
## 一 Object.keys()
参数：要返回其枚举自身属性的对象  
返回值：一个表示给定对象的所有可枚举属性的字符串数组  
### 1 处理对象，返回可枚举的属性数组
```js
let person = {name:"张三",age:26,address:"广州",getPhone:function(){}}
object.keys(person) // ["name", "age", "address","getPhone"]
```
### 2 处理数组，返回索引值数组
```js
let arr = [1,2,3,4,5,6]
Object.keys(arr) // ["0", "1", "2", "3", "4", "5"]
```
### 3 处理字符串，返回索引值数组
```js
let str = "wasdr字符串"
Object.keys(str) // ["0", "1", "2", "3", "4", "5", "6", "7"]
```
### 4 拓展
从上面的Object.keys() 打印结果看，打印结果给我们自动排序了，并且和for in 的排序一样。这是因为 Object.keys在内部会根据属性名key的类型进行不同的排序逻辑。分三种情况：  
如果属性名的类型是Number，那么Object.keys返回值是按照key从小到大排序  
如果属性名的类型是String，那么Object.keys返回值是按照属性被创建的时间升序排序。  
如果属性名的类型是Symbol，那么逻辑同String相同

### Object.values()
Object.values()和Object.keys()是相反的操作，把一个对象的值转换为数组

## 二 Array.from()
Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。  
那么什么是类数组对象呢？所谓类数组对象，最基本的要求就是具有length属性的对象。
```js
let arrayLike = {
    0: 'tom', 
    1: '65',
    2: '男',
    3: ['jane','john','Mary'],
    'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr) // ['tom','65','男',['jane','john','Mary']]
```

## 三 toString()  和 string()
### 1 toString() 方法不能转化 null和 undefined ,转化会报错 
    `obj.toString(2) obj.toString(8)` 表示转化为进制
### 2 string()
    该方法不能转化为进制功能，但是可以转化 null和 undefined 成字符串

## 四 toLocaleString()
### 1 oLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
```js
var d=new Date();
var n=d.toLocaleString();  //2020/10/12 下午3:41:02
```
### 2 还可以将数字变成千分位格式:
```js
let num=12345678;
console.log(num.toLocaleString()); // 12,345,678
```

## 五
###1 输入框限制只能输入正整数
```html
    <input type='text' onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model="inputNum1" placeholder="请输入起始条数">
```
^0  是以0开头  , ( 0+ | \d +) 是存在   一个或多个0    或者     一个或多个数字  为一组   (例如 ： 00,01,02,023.....)
^ 在[] 这里面，代表 非 的意思 ， 匹配不是数字的字符串





 


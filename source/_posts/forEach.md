---
title: forEach
date: 2020-12-30 09:45:58
tags:
---
## 如果要使用数组的forEach()方法对其改值时，需要直接通过arr[i]这种方式来更改。
```js
// 数组改值
    let arr = [1,3,5,7,9];
    arr.forEach(function(item){
        item = 30;
    })
    console.log(arr);   //输出 (5) [1, 3, 5, 7, 9]
```
显然没有达成目的，下边这样写可以实现
```js
　　 // 数组改值
    let arr = [1,3,5,7,9];
    arr.forEach(function(item,index,arr){
        arr[index] = 30;
    })
    console.log(arr); //输出 (5) [30, 30, 30, 30, 30]
```

## 另外
```js

var arr1 = [1,2,3,4];
 
var arr2 = [{a:1},{a:2},{a:3}];
 
arr1.forEach(item =>{
 
    item = item * item;
 
});
arr2.forEach(item =>{
 
    item.a = item.a * item.a;
 
});
console.log(arr1); // [1,2,3,4]
 ```
 forEach 在对 item 进行修改的时候，如果 item 是原始类型的值，item 对应的 的内存地址实际并没有变化,
如果 item 是 引用类型的值，item 对应多的内存地址也没有变化，但是对应的值，已经重写了


---
title: 一些css问题
date: 2021-05-31 09:26:11
tags:
---
## 1. 使用flex布局，子元素超出父元素问题
```html
<style>
    .content {
        display: flex;
        width: 100%;
        margin: 0 auto;
        padding: 0 100px;
    }
    .box1 {
        min-width: 100px;
    }
    .box2 {
        flex: 1;
        
    }
    .sonDiv {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<div class="content">
    <div class="box1"><span>asdjklasjj</span></div>
    <div class="box2"><div class="sonDiv">三年级看撒开就能看见啊萨克塞纳看卡上就说你撒快就像三卡三能看见俺的空间安卡就难受那可是可能卡</div></div>
</div>
```
问题：当content设置flex布局，sonDiv设置宽度为100%时，子元素宽度超出了父元素宽度，
解决办法：给sonDiV的父元素box2设置 min-width:0

## 2. width:100%再设置margin或padding溢出的问题
```html
<style>
    .parent {
        width: 500px;
        height: 50px;
        background-color: green;
        border: 1px solid #e74d4d;
    }
    .child {
        width: 100%;
        height: 30px;
        margin: 20px;
        background-color: pink;
    }
</style>
<div class="parent">
    <div class="child"></div>
</div>
```
解决办法：1. 父元素设置padding，子元素不设置
        2. 父元素设置怪异模型盒子border-box

## 3. 子元素padding-bottom撑不起父元素的高
```html
 <style>
    .parent {
        
    }
    .child {
        padding: 0 0 40px 0;
    }
</style>
<div class="parent">
    <span class="child">djqidqdoiqwjdwiqo</span>
</div>
```
原因：规范这样定的，对于 inline 的元素，垂直方向的 padding 是没有的，水平方向有用
解决办法：span标签增加 `display: inline-block` 或者`block`

## 4. 原生横向滚动
```css
    white-space: nowrap; 
    overflow-x:scroll; 
```
## 5. 文字显示两排，第二排文字显示省略号
```css
    dispaly: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
```
坑：因为在vue项目中打包会自动添加浏览器前缀，所以` -webkit-box-orient: vertical;`可以写在 html的style中


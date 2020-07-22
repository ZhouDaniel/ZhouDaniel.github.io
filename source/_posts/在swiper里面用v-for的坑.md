---
title: 在swiper里面用v-for的坑
date: 2020-07-11 13:25:55
tags: swiper
categories:
  - js
---

## 一 代码(因为是ts项目，data，methods写法可能不一样)

```html
<swiper :options="swiperOption" ref="mySwiper">
  <swiper-slide v-for="(item,index) in allCardArray" :key="index">
    <div
      class="inter-box"
      @click="swiperClick(index+1)"
      :class="{ active: swiperIndex == index+1 }"
    >
      <div class="title"><span>{{item.title}}</span></div>
      <div class="inter">
        <Icon type="ios-more" size="24" />
        <p><span>{{item.money}}</span><span>元</span></p>
        <p><span>{{item.votes}}</span><span>票</span></p>
        <div class="outer">
          <div :id="zchart(index)" class="zchart"></div>
          <div class="zeft">
            <p>
              {{item.ratio}}%
            </p>
            <p>
              场景占比
            </p>
          </div>
        </div>
      </div>
    </div>
  </swiper-slide>
</swiper>

<div class="swiper-button-prev" slot="button-prev"></div>
<div class="swiper-button-next" slot="button-next"></div>
```

```js
    private allCardArray: any = [];
    async queryAllCard() {
    // 获取接口数据
    const result = await queryAllCard2(this.dateType, this.dateTime);
    this.allCardArray = [];
    if  (result.status) {
        for( var key in result.allCards ){
        this.allCardArray.push(result.allCards[key]);
        }
    // 绘制echarts图方法
        this.setLine1();
        this.setLine2();
        this.setLine3();
      }
    }
   // 动态绑定id方法
    zchart(index: any) {
        return "zchart" + (index + 1);
    }
    setLine1() {
        var echarts = require("echarts");
        var echartDemo = echarts.init(document.getElementById("zchart1"));
        var option = {
            ......
        }
        echartDemo.setOption(option);
    }
    setLine2(){

    }
    setLine3(){

    }
```

接口的结构差是这样：

```json
{
    Y1: {
        title: 'a',
        money: 'b',
        votes; 'c',
        ratio: 'd',
    },
    Y2: {
        title: 'a1',
        money: 'b1',
        votes; 'c1',
        ratio: 'd1',
    }
    Y3: {
        title: 'a2',
        money: 'b2',
        votes; 'c2',
        ratio: 'd2',
    }
}
```
## 二 问题
1. 根据接口获取的数据，来绘制echarts图表，这边 `v-for` 循环写在了 `swiper-slide`上，导致出现了问题，问题：显示找不到 dom，echarts表也显示不出来
```js
[Vue warn]: Error in mounted hook: "TypeError: Cannot read property 'getAttribute' of null"
```

## 三 解决过程
1. 定义allCardArray 时，把结构写出来，
```js
 private allCardArray: any = [
    { money: "", ratio: 0, title: "", votes: "" },
    { money: "", ratio: 0, title: "", votes: "" },
    { money: "", ratio: 0, title: "", votes: "" },
  ];
```

## 四 猜想
1. 可能是因为渲染数据时，allCardArray本身没有money，ratio，title，votes等字段，但是异步获取数据时，更新了allCardArray的结构，而绘制echarts表时，获取dom时，数据和dom还没更新完成，导致获取不到，所以，在定义时，就把结构写上，试了一下如果`v-for` 循环写在普通div上，并不需要这么做。

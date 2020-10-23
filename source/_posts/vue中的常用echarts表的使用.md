---
title: 常用echarts表的使用(vue项目中)
date: 2020-07-21 14:07:31
tags: vue echarts
categories:
- echarts
---
## 一 安装并引入
```js
npm install echarts --save
```
### 1. main.js 中全局引入
```js
import echarts from 'echarts'
Vue.prototype.$echarts = echart
```
在vue模板中的写法
```html
<div id="main" style="width: 600px;height:400px;"></div>      <!-- html -->
```
```js
var myChart = this.$echarts.init(document.getElementById('main'));  //js
```
### 2. 直接在vue文件中使用
```js
var echarts = require("echarts");
```
## 二 柱状图
```html
<div id="main1" style="width: 600px;height:400px;"></div>      <!-- html -->
```
```js
var echarts = require("echarts");
var echartDemo = echarts.init(document.getElementById("main1"));
const colorArray = [
        {
            top: "#FC5996", //hong
            bottom: "#E9484E",
        },
        {
            top: "#FC5996", //hong
            bottom: "#E9484E",
        },
        {
            top: "#FC5996", //hong
            bottom: "#E9484E",
        },
        {
            top: "#FDD754", //huang
            bottom: "#FBAE2A",
        },
        {
            top: "#FDD754", //huang
            bottom: "#FBAE2A",
        },
        {
            top: "#96A5F5", //lan
            bottom: "#5D6CE8",
        },
        {
            top: "#96A5F5", //lan
            bottom: "#5D6CE8",
        },
    ];
var option = {
    xAxis: [
        {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 
            axisLine: { // x线
                show: false
            },
            axisTick: { //线标
                show: false
            }
        }
    ],
    yAxis: {
        type: "value",
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        { 
            show: false
        }
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            itemStyle: {
                barBorderRadius: [12, 12, 12, 12], // 柱状图弧度
                color: function(params) {
                    let num = colorArray.length;
                    return new echarts.graphic.LinearGradient(0,0,0,1, //控制颜色渐变的方向
                        [
                            {
                                offset: 0,
                                color:colorArray[params.dataIndex % num].top
                            },
                            {
                                offset: 1,
                                color:colorArray[params.dataIndex % num].bottom
                            }
                        ]
                    );
                }
            },
            barWidth: "12px"  //柱子的宽度
        }
    ]
};
echartDemo.setOption(option);
```

## 三 折线图
```html
<div id="main1" style="width: 600px;height:400px;"></div>      <!-- html -->
```
```js
var echarts = require("echarts");
var echartDemo = echarts.init(document.getElementById("main1"));
var option = {
    backgroundColor: "#fff",
    color: ["#266FFB", "#FFD42A"],
    legend: {  
        data: ["异常金额", "异常票数"],
        right: "5%",
        top: "1%",
    },
    xAxis: [
        {
            type: "category",
            data: [6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,6.9,6.10,],
            axisLine: {
                lineStyle: {
                    color: "#999", //x轴颜色
                },
            },
            axisTick: {
                alignWithLabel: true,
                show: true,
            },
        },
    ],
    yAxis: [
        {
            type: "value",
            splitNumber: 5,
            axisLabel: {   
                show: true,
            },
            axisTick: {   
                show: true,
            },
            axisLine: {  
                show: true,
            },
            splitLine: { 
                show: true,
                lineStyle: {
                    color: "#ececec",
                },
            },
            min: 0, 
        },
        {
            type: "value",
            splitNumber: 5,
            name: '1212',    
            nameTextStyle: {   // 文字样式
                color: "pink",
                align: "center",
                textVerticalAlign: "middle",
            },
            axisLabel: {  //坐标轴刻度标签的相关设置。
                show: true,
            },
            axisTick: {    //坐标轴刻度相关设置
                show: true,
            },
            axisLine: {
                show: true,  //坐标轴轴线相关设置。
            },
            splitLine: {    //坐标轴在 grid 区域中的分隔线
                show: true,
                lineStyle: {
                    color: "#eee",
                },
            },
            min: 0,   // y轴最小值
        },

    ],
    grid: {
        top: "15%",
        left: "10%",
        right: "10%",
        bottom: "10%", // 表的底座位置大小
    },
    tooltip: {
        trigger: "axis", // 触发机制
        backgroundColor: "#fff", // tooltip的背景颜色
        axisPointer: {
            type: "line",  // 指标样式
        },
        textStyle: {
            color: "#383B4F",
        },
        extraCssText: "box-shadow: 0 0 9px 0 rgba(225,227,239,0.66);",
        formatter: function(params) {  // 自定义 tooltip
            var html = "";
            var seriesName = ["异常票数", "异常金额"];
            var color = ["#166bf6", "#ffe100"];
            html +=
                '<div style="display:inline-block;width:150px;position: relative;margin-left:10px;background:#fff">';
            html +=
                '<div class="tooltipCont" style="display:block;width:150px;position: relative;">';
            html +=
                '<i style="display:inline-block;width: 8px;height: 8px;margin-right: 6px;border: none;border-radius: 100%;background:red;"></i><span class="">' +
                params[0].name +
                "</span><br/>";
            params.forEach(function(item, index) {
                html +=
                    '<i style="display:inline-block;width: 8px;height: 8px;margin-right: 6px;border: none;border-radius: 50%;background:' +
                    color[index] +
                    '"></i>' +
                    '<span style="display:inline-block;font-size:12px;color:#8F9095;margin-left:0px;width:40px;">' +
                    seriesName[index] +
                    "</span>" +
                    '<span style="display:inline-block;font-size:14px;color:#37375A;margin-left:15px;">' +
                    params[index].value +
                    "</span><br/>";
            });
            html += "</div>";
            return html;
        },
    },
    series: [
        {
            type: "line",
            showSymbol: true,
            symbol: "circle", 
            symbolSize: 6,    // 折线标设置
            name: "异常金额", // 注意这边的legend中的文字对应
            smooth: true,
            areaStyle: {   // 区域颜色渐变
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(69,144,246,.5)",
                            },
                            {
                                offset: 1,
                                color: "#fff",
                            },
                        ]
                    ),
                },
            },
            lineStyle: {   // 折线样式设置
                normal: {
                    color: "#266FFB", 
                    width: "2",
                },
            },
            data: [300,210,200,135,564,456,643,367,345,123],
        },
        {
            type: "line",
            name: "异常票数",
            showSymbol: true,
            symbol: "circle",
            smooth: true,
            symbolSize: 6,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(255,202,66,.5)",
                            },
                            {
                                offset: 1,
                                color: "#fff",
                            },
                        ]
                    ),
                },
            },
            lineStyle: {
                normal: {
                    color: "#FFD42A",
                    width: "2",
                },
            },
            yAxisIndex: 1,
            data: [1234,2234,2345,2222,5332,2356,2235,6443,2347,4432],
        },
    ],
};
echartDemo.setOption(option);
```
## 四 双向柱状图
```html
<div id="main1" style="width: 600px;height:400px;"></div>      <!-- html -->
```
```js
            var echarts = require("echarts");
            var echartDemo = echarts.init(document.getElementById("main1"));
            const colorArray = [
                {
                    top: "#FF6060", //hong
                    bottom: "#FF71C5"
                },
                {
                    top: "#FF6060", //hong
                    bottom: "#FF71C5"
                },
                {
                    top: "#FF6060", //hong
                    bottom: "#FF71C5"
                },
                {
                    top: "#FFB172", //huang
                    bottom: "#FFE9A8"
                },
                {
                    top: "#FFB172", //huang
                    bottom: "#FFE9A8"
                },
                {
                    top: "#FFB172", //huang
                    bottom: "#FFE9A8"
                },
                {
                    top: "#7760FF", //lan
                    bottom: "#71B2FF"
                },
                {
                    top: "#7760FF", //lan
                    bottom: "#71B2FF"
                },
                {
                    top: "#7760FF", //lan
                    bottom: "#71B2FF"
                },
                {
                    top: "#7760FF", //lan
                    bottom: "#71B2FF"
                }
            ];
            var option = {
                // baseOption: {
                    background: "#fff",
                    legend: {
                        top: "5%",
                        left: "center",
                        textStyle: {
                            color: "#383B4F",
                            fontSize: "12px"
                        },
                        data: ["金额", "票数"]
                    },
                    tooltip: {
                        show: true,
                        trigger: "item",
                        axisPointer: {
                            type: "shadow"
                        },
                        formatter: "{b}<br/>{a}: {c}"
                    },
                    //网格grid区域
                    grid: [
                        {
                            show: false,
                            left: "10%",
                            top: "15%",
                            bottom: "5%",
                            // containLabel: true,
                            width: "34%",
                        },
                        {
                            show: false,
                            left: "51.7%",
                            top: "15%",
                            bottom: "5%",
                            width: "10%",
                            tooltip: {
                                show: false
                            },
                        },
                        {
                            show: false,
                            right: "10%",
                            top: "15%",
                            bottom: "5%",
                            // containLabel: true,
                            width: "34%",
                        }
                    ],
                    //x轴线配置
                    xAxis: [
                        {
                            gridIndex: 0,
                            type: "value",
                            position: "top",
                            inverse: true, 
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 1
                                },
                                position: "left",
                                left: 0
                            },
                            splitLine: {
                                show: false
                            }
                        },
                        {
                            gridIndex: 1,
                            show: false
                        },
                        {
                            //右侧区域
                            gridIndex: 2,
                            type: "value",
                            position: "top",
                            inverse: false,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 12
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    //y轴线配置
                    yAxis: [
                        {
                            //左侧区域
                            gridIndex: 0,
                            type: "category",
                            inverse: true,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                show: false
                            },
                            // data: [0,1,2,3,4,5,6,7,8,9]
                        },
                        {
                            gridIndex: 1,
                            type: "category",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: "#000",
                                    fontSize: 12
                                }
                            },
                            data: [0,1,2,3,4,5,6,7,8,90]
                        },
                        {
                            gridIndex: 2,
                            type: "category",
                            inverse: true,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false,
                                lineStyle: {
                                    color: "#fff"
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            // data: [432,123,357,732,145,643,337,864,253,218]
                        }
                    ],
                    series: [
                        {
                            name: "金额",
                            type: "bar",
                            barWidth: 6,
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            label: {
                                normal: {
                                    show: true,
                                    position: "left",
                                    textStyle: {
                                        color: "#000",
                                        fontSize: "12px"
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: function(params) {
                                        let num = colorArray.length;
                                        return {
                                            type: "linear",
                                            colorStops: [
                                                {
                                                    offset: 0,
                                                    color:
                                                        colorArray[
                                                            params.dataIndex %
                                                                num
                                                        ].bottom
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        colorArray[
                                                            params.dataIndex %
                                                                num
                                                        ].top
                                                }
                                            ]
                                        };
                                    },
                                    barBorderRadius: 10,
                                    borderWidth: 0,
                                    borderColor: "#333"
                                }
                            },
                            data: [10,30,20,40,20,50,45,65,76,87]
                        },
                        {
                            name: "票数",
                            type: "bar",
                            barWidth: 6,
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            label: {
                                normal: {
                                    show: true,
                                    position: "right",
                                    textStyle: {
                                        color: "#000",
                                        fontSize: 10
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        let num = colorArray.length;
                                        return {
                                            type: "linear",
                                            colorStops: [
                                                {
                                                    offset: 0,
                                                    color:
                                                        colorArray[
                                                            params.dataIndex %
                                                                num
                                                        ].bottom
                                                },
                                                {
                                                    offset: 1,
                                                    color:
                                                        colorArray[
                                                            params.dataIndex %
                                                                num
                                                        ].top
                                                },
                                      
                                            ]
                                        };
                                    },
                                    barBorderRadius: 10,
                                    borderWidth: 0,
                                    borderColor: "#333"
                                }
                            },
                            data: [432,123,357,732,145,643,337,864,253,218]
                        }
                    ]
            };
            window.onresize = function() {
                echartDemo.resize();
            };
            echartDemo.setOption(option);
```
五 极坐标系柱状态
```html
<div id="main1" style="width: 600px;height:400px;"></div>      <!-- html -->
```
```js
            var echarts = require("echarts");
            var echartDemo = echarts.init(document.getElementById("main1"));
            var option = {
                title: {
                    text: "24.67%",   // 主标题
                    subtext: "Sub Title",   // 副标题
                    textStyle: {       // 主标题样式
                        color: "#383B4F",
                        fontSize: 30
                    },
                    subtextStyle: {    // 副标题样式
                        color: "#909090"
                    },
                    itemGap: 100, // 主副标题距离
                    left: "center", //标题位置
                    top: "30%"
                },
                angleAxis: {
                    //极坐标系的角度轴
                    max: 100, // 最大值
                    clockwise: true, // 逆时针
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                radiusAxis: {
                    //极坐标系的径向轴。
                    type: "category",
                    // 隐藏刻度线
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                polar: {
                    center: ["50%", "50%"], //坐标系的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
                    radius: "160%" //极坐标系的半径。
                },
                series: [
                    {
                        type: "bar",
                        data: [
                            {
                                value: "24.67",
                                itemStyle: {
                                        color: new echarts.graphic.LinearGradient(1,0,0,0,
                                            [{
                                                offset: 0,
                                                color: "#FF1B4E"
                                            },
                                            {
                                                offset: 1,
                                                color: "#FFAD50"
                                            }
                                        ]
                                    )
                                }
                            }
                        ],
                        coordinateSystem: "polar",   //该系列使用的坐标系，
                        roundCap: true,  //是否在环形柱条两侧使用圆弧效果。(4.21版本无效)
                        barWidth: 5,  
                        animationEasing: 'bounceOut', // 初始动画
                        barGap: "-100%", // 两环重叠
                        z: 2    // 权重
                    },
                    {
                        // 灰色环
                        type: "bar",
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    color: "#EBF4F7"
                                }
                            }
                        ],
                        coordinateSystem: "polar",
                        roundCap: true,   
                        barWidth: 5,
                        barGap: "-100%", // 两环重叠
                        z: 1
                    }
                ]
            };
            echartDemo.setOption(option);
```
tips：roundCap: true,在最新的@4.8版本生效，在@4.21版本不生效

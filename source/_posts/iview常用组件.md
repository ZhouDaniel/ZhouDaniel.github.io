---
title: iview常用组件
date: 2020-07-02 08:06:13
tags: iview
categories:
- iview
---
## 一 在vue-cli中引入iview
### 1. 安装依赖
```js
npm install iview --save
```
### 2.0 全局引入

在 main.js 文件中写入
```js
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);
```
### 2.1 按需引入
```js
import 'iview/dist/styles/iview.css';
import { Button } from 'iview';
Vue.component('Button', Button);
```
由于把Button注册到vue上了，所以在vue文件可以直接使用，不要引入 了,所以在写vue项目的时候，可能引入的组件比较多，可以把这些按需引入的代码写到一个js里面，在vue的入口文件引入这个js里面，比较好。

### 3 一些坑
1. 使用 Select Option 的组件时,下拉框的位置，总是不固定，会乱跑，
观察：样式问题，查看渲染页面，发现下拉框有absolute定位，而它的父组件却没有定位，
解决： 给父元素增加定位,因为是组件，需要样式渗透的写法
    ```js
    div>>>.ivu-select{
        position:relative;
    }
    ```
2. 使用Select Option 的组件,重置数据为 '' 时，向后台传数据时，发现不是 '' 而是undifined,重置2次后，数据才为 '' ,
解决：例如Select绑定的值为 checkWay，在发请求时，做个处理 `this.checkway || ''`

3. 使用menu，url是动态传入的，所以首次会没有active的样式，可以在拿到接口返回的url时，
在$nextTick中写入两个方法
```js
this.$nextTick(() => {
                (this.$refs.nav as any).updateOpened();
                (this.$refs.nav as any).updateActiveName();
 }) 
```
4. 使用table请求数据展示时，先显示暂无数据 之后再加载数据 问题
```js
  async queryTable() {
        //1
        // this.tableArray = [];
        // this.total = 0     
        const result = await queryTableAfi(
            this.dateTime,
            this.dateType,
            this.cardType,
            this.selectedLevel,
            this.orgName,
            this.pageSize,
            this.currentPage,
        );
        //2 
        this.tableArray = [];
        this.total = 0      
        if (result.message) {
            result.data.data.forEach((item: any) => {
                this.tableArray.push({
                    deptName: item.deptName, 
                    money: item.money, 
                    allMoney: item.allMoney, 
                    mRatio: item.mRatio, 
                    favorMoney: item.favorMoney, 
                    votes: item.votes,
                    allVotes: item.allVotes, 
                    vRatio: item.vRatio,
                    cust: item.cust
                });
            });
            this.total = result.data.total;
        }
    }
```
是因为把表格数据清空操作放在了请求接口之前,也就是上面的 1 位置，改成放在请求之后也就是 2 位置就好

5. SELECT 标签选中值，重置为空后，值为 UNDEFINED
重置不能为空，只能是某项options的值，会被转化成undifined

### 4 table的render函数
自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引
1. 用法
```js
render:(h,params) => {
  return h(" 定义的元素 "，{ 元素的性质 }，" 元素的内容"/[元素的内容])
}
```
2.当定义的元素中要嵌套其他元素时：
```js
render:(h,params)=>{
     return h('div',{style:{width:'100px',height:'100px',background:'#ccc'}},[h('p','内容2')],'内容1')
}
```
3. 实例：
```html
<Table
    ref="modalTable"
    :columns="modalColumns"
    :data="deliveryData"
    border
    stripe
></Table>
```
```js
modalColumns: [
                {
                    title: "选择",
                    key: "checkbox",
                    width: 70,
                    align: "center",
                    render: (h: any, params: any) => {
                        return h("div", [   // 这个是html元素
                            h("Checkbox", {  // 这个是div嵌套的iview 的checkBox组件
                                props: {
                                    value: params.row.checkbox, // 这个是组件接收的值
                                },
                                on: {
                                    "on-change": (e: any) => { // 监听checkbox
                                        console.log(e);
                                        if (this.deliveryData.length > 0) { //deliveryData是自己传入的表格数据
                                            this.deliveryData.forEach(
                                                (items: any) => {
                                                    this.$set(
                                                        items,
                                                        "checkbox",
                                                        false
                                                    );
                                                }
                                            );
                                        }    // 使用所有checkbox先为false
                                        this.deliveryData[
                                            params.index
                                        ].checkbox = e; // 再使选中的checkbox变为e，e为true或者false
                                        this.currentChoose = params.index; //记录一下index，其他地方用的到
                                    },
                                },
                            }),
                        ]);
                    },
                },
                { title: "序号", key: "id", align: "center", tooltip: true },
                {
                    title: "检查项目",
                    key: "checkProject",
                    align: "center",
                    tooltip: true,
                },
```

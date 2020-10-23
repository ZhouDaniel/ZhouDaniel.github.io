---
title: vue中的一些知识点
date: 2020-07-18 16:36:59
tags: vue
categories:
- vue
---
## 一 this.$router.replace()
与`this.$router.push()`不同的是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。

## 二 @click.native
给vue组件（包括`router-link`这种）绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符）

## 三 @mouseenter，@mouseleave
vue提供鼠标进入和离开的方法

## 四 @input
vue的input 有监听input框变化的方法 。`@input`

## 五 filter 过滤器和过滤器复用
1.1 过滤器被用于一些常见的文本格式化，被添加在表达式的尾部，由“管道”符号指示。
1.2 filter 写在组件中
 ```js
    export default {
        data() {
            return {
                text: 'hello'
            }  
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    }
```
1.3 filter 写在全局
```js
Vue.filter('capitalize', function(value:any) {    // filter.js
    if (!value) return "";
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});
```
试想一个场景，不仅模板内用到这个函数，在 method 里也需要同样功能的函数。但过滤器无法通过 `this` 直接引用，难道要在 `methods` 再定义一个同样的函数吗？
要知道，选项配置都会被存储在实例的 `$options` 中，所以只需要获取 `this.$options.filters` 就可以拿到实例中的过滤器。  

2.1 filter的复用
```js
    export default {
        methods: {
            getDetail() {
                this.$api.getDetail({
                    id: this.id
                }).then(res => {
                    let capitalize = this.$options.filters.capitalize
                    this.title = capitalize(res.data.title)
                })
            }
        }
    }
```
除了能获取到实例的过滤器外，还能获取到全局的过滤器，因为 `this.$options.filters` 会顺着 `__proto__`向上查找，全局过滤器就存在原型中。

## 六 优雅更新props
### 1.1 更新 prop 在业务中是很常见的需求，但在子组件中不允许直接修改 prop，因为这种做法不符合单向数据流的原则，在开发模式下还会报出警告。因此大多数人会通过 $emit 触发自定义事件，在父组件中接收该事件的传值来更新 prop。
child.vue
```js
    export defalut {
        props: {
            title: String  
        },
        methods: {
            changeTitle(){
                this.$emit('change-title', 'hello')
            }
        }
    }
```
parent.vue:
```html
<child :title="title" @change-title="changeTitle"></child>  //html
```
```js
    export default {
        data(){
            return {
                title: 'title'
            }  
        },
        methods: {
            changeTitle(title){
                this.title = title
            }
        }
    }
```
### 2.1 这种做法没有问题。但如果你只是想单纯的更新 prop，没有其他的操作。那么 sync 修饰符能够让这一切都变得特别简单。  

parent.vue:
```html
<child :title.sync="title"></child>
```
child.vue
```js
export defalut {
    props: {
        title: String  
    },
    methods: {
        changeTitle(){
            this.$emit('update:title', 'hello')
        }
    }
}
```
只需要在绑定属性上添加 .sync，在子组件内部就可以触发 update:属性名 来更新 prop。可以看到这种手段确实简洁且优雅，这让父组件的代码中减少一个“没必要的函数”。

## 七 预加载Prefetch
路由懒加载可以让我们减少首屏的时间，只有打开特定的页面，才会加载特定的js
在vue-cli3升级之后，配置了webpack的预加载，所以可以看见首屏好像依然加载了其他页面的js，其实是页面在加载完本页面的资源后，才会请求其他资源，但这些资源不会被解析

## 八
在templeate 上面写v-show 是不起作用的,把templeate 改成html标签即可
```html
 <template v-show="titleIndex == 0">
 <template v-show="titleIndex == 1">
 ```

 ## 九 onfoucs onblur
 在vue中需要写成 @foucs @blur的形式

 ## 十
 在一些比较旧的浏览器不能使用axios，可以使用
window.open(URL,name)来下载，其中URL是下载表格接口，name配置是否打开新窗口
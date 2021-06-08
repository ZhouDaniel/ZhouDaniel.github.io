---
title: vue面试知识点
date: 2021-04-22 09:50:34
tags:
---
## 1. 为什么vue中的data是一个函数？`
回答一 `因为组件是需要复用，所有的组件实例都会复用data，如果data是一个对象，会影响到其他的组件，所以data要写成函数（组件之间不会互相影响）`
回答二 因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

## 2. Vue组件通讯有哪些？
1. prop和emit
   + 父向子 父组件把数据通过V-bind传递给子组件
   + 子组件通过prop 来接收父组件传递过来的值
   + 子向父 子组件通过emit 把数据传递给父组件
   + 父组件通过一个自定义方法来接收子组件传递过来的值
2. EvenBus 事件总线
   + 在入口文件main.js 全局绑定EvenBus
    ```js
        import Vue from 'vue';
        Vue.prototype.$bus = new Vue    
    ```
    或者 新建一个js文件，
    ```js
        import Vue from 'vue'
        export const bus = new Vue()
    ```
    2.使用
    ```js
    <div @click="addCart">添加</div>
        A页面 在事件中触发
        export default{
            methods: {
                addCart(event){
                    this.$bus.$emit('getTarget', event.target)
                }
            }
        }
        // 另一组件 接收
        export default{
            created(){
                this.$bus.$on('getTarget', target =>{
                    console.log(target)
                })
            }
        }
    ```
3. 通过 Vuex
Vuex 适用于 父子、隔代、兄弟组件通信
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
改变 store 中的状态的唯一途径就是显式地提交  (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

4. $parent / $children 适用 父子组件通信
5. provide / inject 适用于 隔代组件通信
6. $attrs/$listeners 适用于 隔代组件通信

## 4. v-model 双向绑定的原理
1. v -> m 通过事件监听,value和v-on的结合体，就是绑定他的value,通过v-on触发，从而更新数据
2. m -> Object.defineProperty( )对属性设置一个set函数，当数据改变了就会来触发这个函数，并通知界面中所有模型的依赖的更新。
首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。因此接下去我们执行以下3个步骤，实现数据的双向绑定：
   + 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
   + 实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
   + 实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。


## 5. computed 和 watch 的区别和运用的场景？ 怎么注销watch

computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；
watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；
运用场景：
当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

使用app.$watch的unwatch方法注销watch	immediate，deep


## 6. v-show 与 v-if 有什么区别 ？ v-if的替代方案
v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。
所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

## 7. 怎样理解 Vue 的单向数据流？
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件接收到后，由父组件修改。

## 8. 直接给一个数组项赋值，Vue 能检测到变化吗？
由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength

为了解决第一个问题，Vue 提供了以下操作方法：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```
为了解决第二个问题，Vue 提供了以下操作方法：
```js
// Array.prototype.splice
vm.items.splice(newLength)
```

## 9. 谈谈你对 Vue 生命周期的理解？
Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。
beforeCreate created beforeMount mounted beforeUpdate update activited deactivated beforeDestory destoryed

## 10. 在哪个生命周期内调用异步请求？
可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：
能更快获取到服务端数据，减少页面 loading 时间；
ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## 11. 父组件可以监听到子组件的生命周期吗？
比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：
```js
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
```
以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：
```js
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```
当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。
## 12. 谈谈你对 keep-alive 的了解？
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：
include定义缓存白名单，keep-alive会缓存命中的组件；exclude定义缓存黑名单，被命中的组件将不会被缓存；max定义缓存组件上限，
keep-alive会缓存不活动的组件实例

## 13. 你使用过 Vuex 吗？

## 14. vue-router 路由模式有几种？能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？
vue-router 有 3 种路由模式：hash、history、abstract，
（1）hash 模式的实现原理
基于 location.hash 来实现的，URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）
（2）history 模式的实现原理
TML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。
## 15. 什么是 MVVM？


## 17. Vue 框架怎么实现对象和数组的监听？
Vue 怎么实现数据双向绑定，大家肯定都会回答 通过 Object.defineProperty() 对数据进行劫持，但是  Object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持，但是我们在使用 Vue 框架中都知道，Vue 能检测到对象和数组（部分方法的操作）的变化，那它是怎么实现的呢？我们查看相关代码如下：
```js
/**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])  // observe 功能为监测数据的变化
    }
  }

  /**
   * 对属性进行递归遍历
   */
  let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
```
通过以上 Vue 源码部分查看，我们就能知道 Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。

## 18. 虚拟 DOM 的优缺点？ 虚拟 DOM 实现原理？
优点：
保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

缺点:
无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。。

原理：
用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
diff 算法 — 比较两棵虚拟 DOM 树的差异；
pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。


## 19. Vue 中的 key 有什么作用？
key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

## 20 你有对 Vue 项目进行哪些优化？
(1）代码层面的优化
v-if 和 v-show 区分使用场景
computed 和 watch  区分使用场景
v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
长列表性能优化
事件的销毁
图片资源懒加载
路由懒加载
第三方插件的按需引入
优化无限列表性能
服务端渲染 SSR or 预渲染
(2)Webpack 层面的优化
Webpack 对图片进行压缩
减少 ES6 转为 ES5 的冗余代码
提取公共代码
模板预编译
提取组件的 CSS
优化 SourceMap
构建结果输出分析
Vue 项目的编译优化
(3）基础的 Web 技术的优化
开启 gzip 压缩
浏览器缓存
CDN 的使用
使用 Chrome Performance 查找性能瓶颈

## 21. vue3与vue2的区别
1 数据劫持优化
vue.js 是响应式的,它是 DOM 是数据的一种映射，数据发生变化后可以自动更新 DOM，用户只需要专注于数据的修改
当数据改变后，为了自动更新 DOM，那么就必须劫持数据的更新，也就是说当数据发生改变后能自动执行一些代码去更新 DOM
Vue.js 1.x 和 Vue.js 2.x 内部都是通过 Object.defineProperty 这个 API 去劫持数据的 getter 和 setter，所以对于一个嵌套层级较深的对象，如果要劫持它内部深层次的对象变化，就需要递归遍历这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的。毫无疑问，如果我们定义的响应式数据过于复杂，这就会有相当大的性能负担。
Vue.js 3.0 使用了 Proxy API 做数据劫持，由于它劫持的是整个对象，那么自然对于对象的属性的增加和删除都能检测到。

2 vue3 对Typesript支持更好 vue2.0 依赖vue-property-decorator 而vue3.x提供了defineComponent，
3. 语法 API 优化-compositionAPI
（1）优化逻辑组织
在 vue2.0 中编写组件的本质就是在编写一个包含了描述组件选项的对象,我们把它成为options API,它的好处就是在于写法符合直觉思维
Options API 的设计是按照methods,computed,data,props这些不同的选项分类.当组件小的时候,这种分类方式一目了然
但是在大型项目组件中,一个组件可能有多个逻辑关注点,当使用options API的时候,每一个关注点都有自己的options,如果需要修改一个逻辑点关注点,就需要在单个文件中不断的上下切换和寻找
它有一个很好的机制去解决这样的问题,就是将某个逻辑关注点相关的代码全部放在一个函数里,这样当需要修改一个功能时,就不在需要在文件中跳来跳去
（2）优化逻辑复用
使用单个 mixin 似乎问题不大，但是当我们一个组件混入大量不同的 mixins 的时候，会存在两个非常明显的问题：命名冲突和数据来源不清晰。
4. 性能优化
（1）引入 tree-shaking 的技术,减少打包体积，依赖 ES2015 模块语法 （import 和 export），通过编译阶段的静态分析，找到没有引入的模块并打上标记
5. 编译优化
在 vue3.0 中做到了,它通过编译阶段对静态模板的分析,编译生成了block tree,block tree是一个将模板基于动态节点指令切割的嵌套区块,每个区块内部的节点结构是固定的
而且每个区块只需要以一个Array来追踪自身包含的动态节点,借助block tree,vue.js 将vnode更新性能由与模板整体大小相关提升为与动态内容的数量相关
在 vue3.0 中,在编译阶段还包括了对slot的编译优化,事件侦听器函数的缓存优化,并且在运行时重写了 diff 算法
5. 其他 瞬移组件  和suspense
## 22. watch的数据在生命周期中可以得到值吗
官网的生命周期图中，init reactivity是晚于beforeCreate但是早于created的。
watch加了immediate，应当同init reactivity周期一同执行，早于created。
而正常的watch，则是mounted周期后触发data changes的周期执行，晚于created  

## 23. 怎么避免其他成员修改vuex的state里面的值
开启严格模式
```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```
## 24. 为什么mutation不能是异步的
每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

## 25. 怎么在全局定义组件
在入口文件定义
```js
//main.js
Vue.component("MyBread", MyBread);//全局自定义组件
```
## 26. 页面怎么传参
1. 标签跳转传参
```js
  
    //路由配置
    path: '/userManager/:id',  
    + (1)
    //跳转页面  
    <router-link :to="{name:'userManager',params: {id: 1}}"> </router-link>
    //接收参数
    this.$route.params.id
    + (2)
    <router-link :to="{path:'/userManager',query: {id: 1}}"> </router-link>
    //接收参数
    this.$route.query.id

```
2.事件跳转
   + query传参 ,相当于get请求，页面跳转时参数会在地址栏中显示
   ```js
   //跳转页面 
    this.$router.push({ 
        path:'/userManager',
        query: {
        id:this.id
        }
    })
    //接收参数
    this.$route.query.id
    ```
   + params传参 相当于post请求，页面跳转时参数不会在地址栏中显示
   ```js
    //跳转页面 
    this.$router.push({ 
        path:'/userManager',
        name:'userManager', 
        //params传参 需要使用 name 否则取不到；对应路由配置的 name
        params: {
            id:this.id
        }
    })
    //接收参数
    this.$route.params.id
    ```
    使用params传参时 刷新页面参数消失,配置路由 在path加 /:id 对应需要传的参数名
    ```js
        //路由配置
        path: '/userManager/:id',
    ```
    
## 27. 动态路由
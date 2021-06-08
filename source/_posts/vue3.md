---
title: vue3学习
date: 2021-04-07 09:05:50
tags:
---
一 概览
1. 打包体积更小，渲染更快，内存使用更小
2. Composition API  
   + ref 和reactive
   + computed 和 watch
   + 新的生命周期函数
   + 自定义函数 - Hooks 函数
3. 其他新增特性
   + Teleport 瞬移组件的位置
   + Suspense 异步加载组件
   + 全局API的修改和优化
4. 更好的Typescript 支持

二 特性
1. refs
`const count= ref(0)` 创建响应式对象和以前的data中的数据相似

2. reactive toRefs
```js
const data:any= reactive({
    count: 0,
    increase: () => data.count++,  // 此处不需要写count.value++
    double: computed(() => data.count*2)
})
const refData = toRefs(data)  //如果要在return中用展开运算符，展开的就是值了，不具有响应式，需要用toRefs包裹，在展开
return { 
    ...refData
}
```
3. 生命周期
1 created 和 beforeCreated 直接写在setup() 里面 ,setup()是最先执行的生命周期
2 destroyed 和beforeDestroyed 变成了 onUnmounted 和 onBeforeUnmounted
3 其他api都在前面加on
4 新增两个调试API onRenderTracked onRenderTriggered

4. watch
```js
const data:any= reactive({
    count: 0,
    increase: () => data.count++,  // 此处不需要写count.value++
    double: computed(() => data.count*2)
})
const greetings = ref('')
watch([greetings,()=>data.count],(newV,oldV) => {  // 多个参数用数组，如果要监测reactive中的值，需要用回调函数
    console.log('newV',newV)
    console.log('oldV',oldV)
    document.title = 'updated' + greetings.value 
})
```

5. hooks
函数的形式

6. vue3 对Typescript的支持
defineComponent并没有实现任何逻辑，只是更好的支持typescript
defineComponent 只是返回传递给它的对象。但是，在类型方面，返回的值具有一个合成类型的构造函数，用于手动渲染函数、 TSX 和 IDE 工具支持
```js
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
```

7. Teleport 瞬移组件
一般用在弹窗上，以前的弹窗被层层包裹在dom节点中，无论样式还是层级都受到影响
Teleport可以让组件挂载在另一个顶层的dom节点
```js
emits: {
    'colse-modal': null
}
setup(props,context){
    context.emit('colse-moda')
}
```
8. Suspense
处理异步加载的组件，刚开始渲染 fallback的内容，直到请求完成才渲染正式内容
如果要使用Suspense，在setup()中，要返回一个promise

用`onErrorCaptured`来监测请求的错误

9. 全局api修改
vue2的问题：在单元测试中，全局配置非常容易污染全局环境
   + 全局配置 Vue.config -> app.config
   + 全局注册类API Vue.compoment -> app.component     Vue.directive -> app.directive
   + 行为扩展类API Vue.mixin -> app.mixin Vue.use -> app.use
   + 全局API的treeShaking
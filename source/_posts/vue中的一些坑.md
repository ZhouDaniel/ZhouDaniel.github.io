---
title: vue中的一些坑
date: 2020-11-02 16:24:46
tags: vue
---
## 一
1. vue中，父子组件通信最常用的方式就是props和 $emit，但是父组件传递给子组件的数据，能不能进行修改，修改后都有啥问题呢

2. 在修改父组件传过来的值时，会报如下错误
```html
Avoid mutating a prop directly since the value will be overwritten whenever  
the parent component re-renders. Instead, use a data or computed  property  
based on the prop's value. 
```
3. 报了这个错误之后一开始感觉也没有影响功能使用，但是有一次，遇到一个通用组件，接收传过来的日期和部门，我改了部门，继续改日期时，发现部门汇重置到之前的部门，也就是父组件传过来的，这里就出现了问题。

4. 总结：每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。  
所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
5. 可以使用computed 不直接改变父组件传过来的值

6.
```html
    父组件改变props，子组件如果直接使用props，会触发子组件更新
    父组件改变props，子组件如果将props放进data中再使用，不会触发子组件更新
    父组件改变props，子组件如果将props放进computed中再使用，会触发子组件更新
    data，props和computed的变化都会触发组件更新
```
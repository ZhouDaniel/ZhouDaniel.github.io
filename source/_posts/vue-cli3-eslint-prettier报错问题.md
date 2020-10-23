---
title: vue-cli3 eslint prettier报错问题
date: 2020-07-05 11:58:43
tags: vue eslint
categories: 
- 配置
---
## 一 问题1
+  在引入iview组件后，因为iview组件是自闭合的，会报标签不闭合的问题
    报错信息
    ```js
    error  Parsing error: x-invalid-end-tag  vue/no-parsing-error
    ```
+ 解决：
    在eslint的rules里面加入
    ```js
       "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    ```
### 二 问题2
1. 空格问题，报`warning Delete `··················` prettier/prettier`错误
2. 解决： 在eslint的rules里面加入
    ```js
    "prettier/prettier": [ 0 ,{
                "semi": false
            }]
    ```
3. 设置js语句后面分号写不写都不报错
    ```js
     "semi": [
                0,
                "always"
            ],
    ```


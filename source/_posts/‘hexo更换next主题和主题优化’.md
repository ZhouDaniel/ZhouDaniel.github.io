---
title: hexo更换next主题和个性化配置
date: 2020-04-14 23:01:50
tags: 
- hexo 
- next主题
categories:
- hexo
---
<!--more-->
## 一 更换主题
### 1. 下载next主题
```
git clone https://github.com/iissnan/hexo-theme-next.git
```
### 2. 进入hexo的_config.yml 找到 *theme* 改成 next
```
theme: next
```

### 3. 输入以下代码重新生成就可以看到主题变化
```
hexo clean
hexo g
hexo s
```
## 二 next主题的个性化配置
### 1 创建分类，标签，关于，等页面
+ 由于next 的menu 默认有 首页 和 归档页，所以不用创建
```
hexo new page 'categories'
hexo new page 'tags'
hexo new page 'about'
```
+ 创建完成后找到next的_config.yml中的 menu，把相关页面的路径代码放出
+ <mark>bug: </mark>这边有一个坑，需要把路径中 `||` 符号前面的空格去掉，不然页面显示不出来

### 2 加上动态背景
找到next的_config.yml的 *canvas_nest* 改成 true

### 3 设置avatar 图片 并且增加旋转特效
+ 在 blog/source/ 目录下新建 uploads 文件夹和其文件夹下的images文件夹，把图片放进去，然后找到hexo的配置文件中的avatar修改路径
```
avatar: '/uploads/images/avatar.jpg'
```

+ 打开\themes\next\source\css\_common\components\sidebar\sidebar-author.styl，在里面添加如下代码：
```css
.site-author-image {
  display: block;
  margin: 0 auto;
  padding: $site-author-image-padding;
  max-width: $site-author-image-width;
  height: $site-author-image-height;
  border: $site-author-image-border-width solid $site-author-image-border-color;

  /* 头像圆形 */
  border-radius: 80px;
  -webkit-border-radius: 80px;
  -moz-border-radius: 80px;
  box-shadow: inset 0 -1px 0 #333sf;

  /* 设置循环动画 [animation: (play)动画名称 (2s)动画播放时长单位秒或微秒 (ase-out)动画播放的速度曲线为以低速结束 
    (1s)等待1秒然后开始动画 (1)动画播放次数(infinite为循环播放) ]*/
 

  /* 鼠标经过头像旋转360度 */
  -webkit-transition: -webkit-transform 1.0s ease-out;
  -moz-transition: -moz-transform 1.0s ease-out;
  transition: transform 1.0s ease-out;
}

img:hover {
  /* 鼠标经过停止头像旋转 
  -webkit-animation-play-state:paused;
  animation-play-state:paused;*/

  /* 鼠标经过头像旋转360度 */
  -webkit-transform: rotateZ(360deg);
  -moz-transform: rotateZ(360deg);
  transform: rotateZ(360deg);
}

/* Z 轴旋转动画 */
@-webkit-keyframes play {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-360deg);
  }
}
@-moz-keyframes play {
  0% {
    -moz-transform: rotateZ(0deg);
  }
  100% {
    -moz-transform: rotateZ(-360deg);
  }
}
@keyframes play {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}
```

### 4 在网站底部增加网站访问数量
+ 打开\themes\next\layout\_partials\footer.swig文件,在copyright前加上[不蒜子](http://busuanzi.ibruce.info/)的js：
```js
<script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
+ 然后在此文件合适的位置加上：
```html
<div class="powered-by">
  <i class="fa fa-user-md"></i>
  <span id="busuanzi_container_site_uv">  //uv的方式，单个用户连续点击n篇文章，记录n次访问量  pv的方式，单个用户连续点击n篇文章，记录n次访问量
    本站访客数:<span id="busuanzi_value_site_uv"></span>
  </span>
</div>
```
<mark>bug: </mark> 这边有坑： 加上id为 <b>busuanzi_container_site_uv</b> 的span后，此标签会被自动加上隐藏的属性，所以这边就把这一层去掉就可以显示（可能有更好的方法）,所以最终的代码为：
```html
<div class="powered-by">
  <i class="fa fa-user-md"></i>
  本站访客数:<span id="busuanzi_value_site_uv"></span>
</div>
```

### 5 增加网站底部总的数字统计和每篇文章的统计功能
1. 网站底部数字统计
   + 切换到根目录下，运行代码
   ```
    $ npm install hexo-wordcount --save
   ```
   + 然后在/themes/next/layout/_partials/footer.swig文件尾部加上：
   ```html
    <div class="theme-info">
      <div class="powered-by"></div>
      <span class="post-count">博客全站共{{ totalcount(site) }}字
      </span>
    </div>
   ```
2. 每篇文章的统计功能
   + 在主题的配置文件中，配置如下：
    ```js
    post_wordcount:
     item_text: true
     wordcount: true
     min2read: true
    ```

### 6 取消文章目录的自动编号
修改主题配置文件, 把 <b>toc</b> 的 number 改为 false
```js
toc:
  enable: true
  # Automatically add list number to toc.
  number: false
```

### 7 增加音乐播放功能
+ 点击 [Aplayer](https://github.com/MoePlayer/APlayer),下载到本地，解压后将dist文件夹复制到themes\next\source文件夹下，
+ 新建themes\next\source\dist\music.js文件，添加内容：
```js
const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  autoplay: false,
  audio: [
    {
      name: "绿色",
      artist: '陈雪凝',
      url: 'http://isure.stream.qqmusic.qq.com/C400001luHbo2nQT1Y.m4a?guid=111305117&vkey=2A4D0BA603249B845F0464D2E95049DB573AD0634D01616AED78C4F53152CD6D8D11AC098357C29E10714895BF5B4FD01E29062D6786701E&uin=0&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M0000010UePb4dyfoi.jpg?max_age=2592000',
    },
    {
      name: 'LEMEO',
      artist: '米津玄师',
      url: 'http://isure.stream.qqmusic.qq.com/C400003pZAGe4Q2w81.m4a?guid=111305117&vkey=6E641AD806E273B61B48AD65B3C536088D6A187A78079C51EEA98366EE8E5FD4AE849CD01A0949AB24118F1B4E8611FB55BD21352780F6AC&uin=4066&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M000002OR8wD3Lo3E5.jpg?max_age=2592000',
    },
    {
      name: '世界这么大还是遇见你',
      artist: '程响',
      url: 'http://isure.stream.qqmusic.qq.com/C400001xLIXo2w9V7U.m4a?guid=111305117&vkey=7474A08F36C5A08AEEEB2D383486FBCE1F72A5D4EBAF9AAF7AD466C0A3E2B90E09029FE86CC3FD09FE9B2C18924672694C98881818BD4CD6&uin=4066&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003Ls5Jo4EFBIH.jpg?max_age=2592000',
    }
  ]
});
```

### 8 增加宠物（妹子）
+ 点击项目[hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d) 
+ 下载此依赖`npm install --save hexo-helper-live2d`
+ 在hexo的配置文件下增加：
  ```js
  live2d:
    enable: true
    scriptFrom: local
    model:
      scale: 1
      hHeadPos: 0.5
      vHeadPos: 0.618
    display:  // 位置
      position: right 
      width: 150
      height: 300
      hOffset: 80
      vOffset: -20
    mobile:  // 是否在移动端显示
      show: false
    react:  // 透明度
      opacity: 0.7
    ```

### 9 修改sidebar 下面日志链接点击后找不到网页的问题
在 hexo的配置文件下把日志(归档)的路径改成：
```
archives: /archives/
```

### 10 增加代码复制功能
1. 下载 [clipboard.js](https://raw.githubusercontent.com/zenorocha/clipboard.js/master/dist/clipboard.js) 或者[clipboard.min.js](https://raw.githubusercontent.com/zenorocha/clipboard.js/master/dist/clipboard.min.js)(推荐)
  保存文件为clipboard.js / clipboard.min.js ，目录如下：<font color= blue>\themes\next\source\js\src</font>
2. 也是在 <font color=blue>*\themes\next\source\js\src* </font>目录下，创建clipboard-use.js，文件内容如下：
```js
/*页面载入完成后，创建复制按钮*/
!function (e, t, a) { 
  /* code */
  var initCopyCode = function(){
    var copyHtml = '';
    copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
    copyHtml += '  <i class="fa fa-globe"></i><span>copy</span>';
    copyHtml += '</button>';
    $(".highlight .code pre").before(copyHtml);
    new ClipboardJS('.btn-copy', {
        target: function(trigger) {
            return trigger.nextElementSibling;
        }
    });
  }
  initCopyCode();
}(window, document);
```
3. 在 <font color=blue>*\themes\next\source\css\_custom\custom.styl* </font>样式文件中添加下面代码：
```css
//代码块复制按钮
.highlight{
  //方便copy代码按钮（btn-copy）的定位
  position: relative;
}
.btn-copy {
    display: inline-block;
    cursor: pointer;
    background-color: #eee;
    background-image: linear-gradient(#fcfcfc,#eee);
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    color: #333;
    -webkit-transition: opacity .3s ease-in-out;
    -o-transition: opacity .3s ease-in-out;
    transition: opacity .3s ease-in-out;
    padding: 2px 6px;
    position: absolute;
    right: 5px;
    top: 5px;
    opacity: 0;
}
.btn-copy span {
    margin-left: 5px;
}
.highlight:hover .btn-copy{
  opacity: 1;
}
```
4. 在 <font color=blue>*\themes\next\layout\_layout.swig* </font>文件中，添加引用（注：在 swig 末尾或 body 结束标签（</body>）之前添加）：
```js
  <!-- 代码块复制功能 -->
  <script type="text/javascript" src="/js/src/clipboard.min.js"></script>  
  <script type="text/javascript" src="/js/src/clipboard-use.js"></script>
```

### 11 修改文章底部带#号的标签

修改模板 /themes/next/layout/_macro/post.swig ，搜索 rel="tag"># ，将 # 换成 
```html
<i class="fa fa-tag"></i>
```

### 12 配置首页不全文展示
在next的配置文件中 搜索 *auto_excerpt* ，找到如下部分：
```js
# Automatically Excerpt. Not recommand.
# Please use <!-- more --> in the post to control excerpt accurately.
auto_excerpt:
  enable: false
  length: 150
```
把 *enable* 对应的 false 改成 true

### 13 分页显示不正常问题
1. 分页中显示了`<i class="fa fa-angle-right"></i>` 这是一个Font Awesome的字体图标，按道理来说这个图标应该可以正常显示的，现在这个图标不能显示了显示成了html源码。
2. 解决办法:
最简单的办法就是将<i class="fa fa-angle-right"></i>这个不能正常显示的字体图标改成一般的字符，我这里就是改成正常的一般左右键字符“>”，“<”。在 themes\hexo-theme-next\layout_partials 下找到hexo-theme-next的翻页组件，就是pagination.swig
将
```js
{% if page.prev or page.next %}
  <nav class="pagination">
    {{
      paginator({
        prev_text: '<i class="fa fa-angle-left"></i>',
        next_text: '<i class="fa fa-angle-right"></i>',
        mid_size: 1
      })
    }}
  </nav>
{% endif %}
```
改成
```js
{% if page.prev or page.next %}
  <nav class="pagination">
    {{
      paginator({
        prev_text: '<',
        next_text: '>',
        mid_size: 1
      })
    }}
  </nav>
{% endif %}
```



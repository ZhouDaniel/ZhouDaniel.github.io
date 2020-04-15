---
title: hexo + github 搭建博客 （一）
date: 2020-04-10 16:51:52
tags: hexo
categories:
- hexo
---
## 一. 环境搭建
1. 下载[node.js](https://nodejs.org/zh-cn/) 并且安装，打开终端 输入 `node -v` 查看是否安装成功
2. 安装 hexo `npm install -g hexo-cli`，安装好之后输入 `hexo -v`查看是否安装成功
   + 在mac电脑下输入 `sudo su`  命令可以进入root用户
   + 如果用npm 安装太慢，可以用淘宝镜像 
   `npm install -g cnmp —registry=https://registry.npm.taobao.org`
&nbsp; 
3. 建立blog目录  `mkdir blog` <font size=2>*(之后对于博客的操作都在此文件夹，如果有问题进行不下去，把此文件夹删掉重来即可)* </font>

4. 进入blog目录  `cd blog/` 初始化hexo `hexo init`,可以输入 `ls -l`查看生产了哪些文件
5. 启动博客 `hexo s` 默认情况下，访问网址为： http://localhost:4000/

-------------------------------------------------------
## 二. 给博客增加一篇文章
##### 1 新建一篇文章 <font size=2 color=gray> 文章会生成在文件 /source/_posts  下</font>
```bash
hexo n '文章名'
```
##### 2 进入文章目录，用vim修改它，也可以在编辑器直接编辑
```bash
vim 文章名
```
   + 按 i 进入insert模式
   + 编辑好之后按 `esc` 键 退出，输入 `:wq` 保存
   
##### 3 退回blog文件夹下进行以下操作在本地更新博客
```bash
hexo clean  清除缓存文件 (db.json) 和已生成的静态文件 (public)
hexo g     生成静态文件。
hexo s     启动服务器。
```
----
## 三. 部署到github
##### 1 新建github仓库 ，仓库名一定是 你的github昵称. + github.io
##### 2 安装git部署插件，进入blog目录，输入
```bash
npm install —save hexo-deployer-git
```
##### 3 配置 _config.yml 文件，在最底下 `deploy` 中 修改`type`并增加`repo`和`branch`
```bash
 type: git
 repo: github的仓库地址
 branch: master
```
##### 4 部署到远端,输入仓库名即可访问博客 <font size=2 color=gray> （第一次会让你输入github账号密码）</font>
```bash
hexo d
```




   

    
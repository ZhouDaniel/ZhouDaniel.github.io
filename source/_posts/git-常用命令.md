---
title: git 常用命令
date: 2020-07-21 17:01:56
tags: git
categories:
- git
---
## 1 添加指定文件/所有文件到暂存区
```js
git add [file1] [file2]
git add .
```
## 2 提交暂存区到仓库区
```js
git commit -m [message]
```
提交暂存区的指定文件到仓库区 : 
```js
git commit [file1] [file2] ... -m [message]
```
## 3 上传本地指定分支到远程仓库
```js
git push [remote] [branch]
```
tips: 1 git push为 推送到默认分支
      2 当本地有分支a，远程没有分支a，可以使用`git push origin a`来上传到远程分支a，相当于建立了远程分支a
强行推送当前分支到远程仓库，即使有冲突 : 
```js
git push [remote] --force
```
## 4 取回远程仓库的变化，并与本地分支合并
```js
git pull [remote] [branch]
```
#### 1. 如果有冲突,可以试一下以下步骤
   + `git stash`  这样本地的所有修改就都被暂时存储起来 。
   + `git pull`   再次拉取代码
   + `git stash pop` 还原暂存的内容 
   + 解决冲突,会显示拉取的和本地的具体冲突的代码
   + 正常add commit push 提交代码

#### 2. 另外  
+ `git stash drop [stash@{0}]`  删除stash记录，默认删除第一条 
+ `git stash clear` 清空所有stash记录 
+ `git stash list` 查询当前项目中存贮的stash列表

## 5 
#### 1 显示当前分支的版本历史
```js
git log
```
#### 2 查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）
```js
git reflog 
```
#### 3 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
```js
git reset --hard [commit]
```
## 6 
#### 1 查看当前分支
```js
git branch 
```
#### 2 切换分支a
```js
git checkout a 
```
#### 3 创建并且切换分支a
```js
git checkout -b a
```
tips: 一般实在主分支master下创建分支，不要在分支上建立分支

#### 4 删除分支a
```js
git branch -D a
```

#### 5 创建本地分支与远程分支
1.如果github上已经有master分支 和dev分支
在本地 
`git checkout -b dev` 新建并切换到本地dev分支
`git pull origin dev` 本地分支与远程分支相关联
`git push --set-upstream origin dev` 提交的时候也可以建立关联
2. 在本地新建分支并推送到远程
`git checkout -b test`
`git push origin test`   这样远程仓库中也就创建了一个test分支

#### 6 查看所有分支(包括本地与远程)
git branch --all（或者--all这里直接-a简写） 

#### 7 git删除远程分支
`git push origin --delete [branch_name]`
## 7 
#### 1可以查看remote地址，远程分支，还有本地分支与之相对应关系等信息
```js
git remote show origin
```




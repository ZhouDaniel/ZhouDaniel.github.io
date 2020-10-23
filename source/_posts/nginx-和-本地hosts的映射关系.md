---
title: nginx 和 本地hosts的映射关系
date: 2020-07-31 14:26:44
tags: hosts nginx
categories:
- nginx
---
## 一 环境
### 1.1 本地hosts
```host
127.0.0.1   ase.test.com
```
### 1.2 nginx 配置
```js
worker_processes  1;
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  3000;
    server {
        listen       8089;
        # server_name  ase.test.com;
		client_max_body_size 50M;
		client_body_buffer_size 200M;
        location ~ .action {
            proxy_pass http://12.221.197.28:8090; 
            index  index.html index.htm;
        }
		location / {
            proxy_pass http://ase.test.com:8080;
			proxy_set_header Upgrade $http_upgrade;             
			proxy_set_header Connection "upgrade";
            index  index.html index.htm;
        }
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
### 1.3 本地测试地址(config.js)
```js
const baseUrl = "http://ase.test.com:8089/"; //测试环境
export { baseUrl };
```
### 1.4 项目启动地址
修改`package.json` 中的 "scripts" 改为
```js
"serve": "vue-cli-service serve --open --host=ase.test.com"
```
启动项目 `npm run serve`
```js
http://ase.test.com:8080/ 
```

## 二 映射关系
1 客户端A(浏览器url请求域名:http://ase.test.com:8089) ------》  
2 域名被host解析对应的IP(127.0.0.1) ------》  
3 到对应IP的服务器 ------》  
4 先被nginx反向代理拦截，找到nginx上一样域名,nginx.conf配置文件中server里的server_name(ase.test.com) ------>    
5 页面对应的反向映射地址(http://ase.test.com:8080)，其中接口地址都以action结尾的,映射到接口服务器地址(http://12.221.197.28:8090)

## 三 其他
1. 如果没有设置server_name或者nginx.conf只配置了一个server,那就默认进入第一个server

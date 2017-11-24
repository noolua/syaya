syaya
=====
一个nightmare的微信页面机器人，可编程工具。基于express的RESTFul接口


安装npm && node
--------------
1. https://npm.taobao.org/mirrors/node 下载对应的版本
2. 解压并mv /node-xxx/ /opt/
3. ln -s /opt/node-xxx/bin/node /usr/local/bin/node
4. ln -s /opt/node-xxx/bin/npm /usr/local/bin/npm
5. npm install -g cnpm --registry=https://registry.npm.taobao.org
6. ln -s /opt/node-xxx/bin/cnpm /usr/local/bin/cnpm


安装依赖包并运行    
-------------
 1. cnpm install
 2. node syaya.js

待完成功能
--------
 - 做一个天气问答的测试

用curl测试api
------------
```
curl "http://127.0.0.1:8080/api/bot/login"
curl "http://127.0.0.1:8080/api/bot/logout"
curl "http://127.0.0.1:8080/api/bot/qrcode"
curl "http://127.0.0.1:8080/api/bot/query_messags"
curl "http://127.0.0.1:8080/api/bot/query_account"
curl "http://127.0.0.1:8080/api/bot/query_contacts"
curl "http://127.0.0.1:8080/api/bot/send_txt_message"

curl "http://127.0.0.1:8080/api/bot/send_txt_message" -d '{"user":"@2f37c025ea41accd42f31d40cfde73860d42d6e516c5b7a2cf36f5c3670dea9d", "msg":"非常可爱哒"}'
```


遇见问题
-------
 - window.reload如何重新加载: 在事件'dom-ready'中注入脚本
```js
  page.engin.on('dom-ready', function () {
    console.log("DOM-READY for inject...");
    page.engin.inject("js", WX_HELPER_JS);
  });
```

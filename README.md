syaya
=====
一个nightmare框架的微信网页版聊天机器人，可编程。基于express的RESTFul接口


安装npm && node && cnpm
--------------
1. https://npm.taobao.org/mirrors/node 下载对应的版本
2. 解压并mv /node-xxx/ /opt/
3. ln -s /opt/node-xxx/bin/node /usr/local/bin/node
4. ln -s /opt/node-xxx/bin/npm /usr/local/bin/npm
5. npm install -g cnpm --registry=https://registry.npm.taobao.org
6. ln -s /opt/node-xxx/bin/cnpm /usr/local/bin/cnpm


目录说明
-------
```
|____conf                       # 程序配置文件
| |____service.json
| |____wxconf.js
| |____cities.json              # 城市气象编码表
|____lib                        # 模块代码
| |____weather.js
| |____inject
| | |____wxinjector.js
| |____wxbot.js
|____test
| |____segments.js
| |____wx_src
| | |____index.js
| |____request_demo.js
| |____weather
| | |____weather.js
| | |____citylist.json
| | |____README.md
| | |____citylist.xml
| | |____chinacities.json
| | |____cities.json
| |____upstream.js
| |____memo.md
|____.gitignore
|____package.json
|____README.md
|____sy-cli.js                  # 天气问答业务程序
|____syaya.js                   # 微信基础服务程序
```

安装依赖包、运行程序
-------------
 1. cnpm install
 2. 启动微信基础服务 node syaya.js
 3. 启动天气问答业务 node sy-cli.js
 4. 扫码登录微信账号（业务账号）
 5. 用另一个微信账号给业务账号发信息测试

待完成功能
--------
 1. ~~做一个天气问答的测试~~

用curl测试syaya的api
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


备忘Tips
-------
----
 - ubuntu server上运行electron
```bash
$sudo apt-get install xvfb libgtk2.0-0 libnotify-bin libgconf-2-4 libnss3 libasound2 libcap2-bin libcups2 libxtst6 libxss1
$xvfb-run node --harmony syaya.js
```
----
 - window.reload如何重新加载注入脚本: 在事件'dom-ready'中注入
```js
  page.engin.on('dom-ready', function () {
    console.log("DOM-READY for inject...");
    page.engin.inject("js", WX_HELPER_JS);
  });
```
----
 - express下，让curl的post正常工作
```js
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({
  limit: '100kb',
  type: 'application/x-www-form-urlencoded'
}));
```
----
 - sleep等待
```js
async function sleep(ms) {
  return new Promise(resolve => {
    var tm = setTimeout(() => {
      console.log("clear", tm);
      clearTimeout(tm);
      resolve(0);
    }, ms);
  });
}
async function test_sleep(){
  var r =  await sleep(2000);
  console.log(r);
}
test_sleep();
```

----
 - js协程处理单条业务, 伪代码
```js
var co = require("co");
function process_message(msg){
  co(function *(message) {
    var action = yield extract_action(message);
    var r = yield action.do_step1();
    if(r.status == "success"){
      r = yield action.do_step2();
    }
    r = yield action.do_final();
    r = yield make_response(action, message);
  }, msg);
}
```


memo
----
```
curl 'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg' -H 'Pragma: no-cache' -H 'Origin: https://wx2.qq.com' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3269.3 Safari/537.36' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'Cache-Control: no-cache' -H 'Referer: https://wx2.qq.com/' -H 'Cookie: webwxuvid=169d9b9e867f7ce99290e5a658c8c96eaec07f5ae4d14ae2e3d3d174e4c8708a2cd115eb5a4377b520310f1b02fb4ece; pgv_pvid=8460914750; pgv_pvi=4262486016; ptui_loginuin=371347; sd_userid=80901510220435025; sd_cookie_crttime=1510220435025; wxuin=2528638641; wxsid=Ql5F94ipKtg+1gVm; mm_lang=zh_CN; webwx_data_ticket=gSesSSmXCi19jCrg7NdbUMuP; webwx_auth_ticket=CIsBEIPxpOAFGoAB/U3iEB/DgpG/P5+dKj6NxJWUm40azcpDdP0NRQqf7Mh5i2cU+gnFBOqOcJttd9EX2xyZbnDYBGaTjR+fdEbSMIdml0iiis3xK1UJkEzmgJER1uu8xchdzWv9ZfC+/fqB0ykW+Jk7o3qDERdENS9AEKvSjul2Eps+2UXqzWzhWJ8=; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; wxloadtime=1511156229_expired; wxpluginkey=1511138882' -H 'Connection: keep-alive' --data-binary $'{"BaseRequest":{"Uin":2528638641,"Sid":"Ql5F94ipKtg+1gVm","Skey":"@crypt_7c619c9c_ffaa04c7daaafdf5951029215b33be86","DeviceID":"e861137483308461"},"Msg":{"Type":1,"Content":"\u9713\u86791234","FromUserName":"@451f178e0be8158a146b0a47eeb277806c903482dff74b6abce1052c410278d4","ToUserName":"@b97b1d984ad9262547b2efc1e07ea5da2327191a0a788c39cab87b5c7c32a9f8","LocalID":"15111572531870273","ClientMsgId":"15111572531870273"},"Scene":0}' --compressed

MM_WX_NOTIFY_STATE  1   wx2.qq.com  /   Session 19          
MM_WX_SOUND_STATE   1   wx2.qq.com  /   Session 18          
mm_lang zh_CN   .wx2.qq.com /   2017-11-20T18:08:08.000Z    12          
mm_lang zh_CN   .wx.qq.com  /   2017-11-20T17:36:52.000Z    12          
pgv_pvi 4262486016  .qq.com /   2038-01-18T00:00:00.000Z    17          
pgv_pvid    8460914750  .qq.com /   2038-01-18T00:00:00.000Z    18          
ptui_loginuin   371347  .qq.com /   2017-12-13T13:03:32.000Z    19          
sd_cookie_crttime   1510220435025   .qq.com /   2018-11-09T09:40:34.225Z    30          
sd_userid   80901510220435025   .qq.com /   2018-11-09T09:40:34.224Z    26          
webwx_auth_ticket   CIsBEIPxpOAFGoAB/U3iEB/DgpG/P5+dKj6NxJWUm40azcpDdP0NRQqf7Mh5i2cU+gnFBOqOcJttd9EX2xyZbnDYBGaTjR+fdEbSMIdml0iiis3xK1UJkEzmgJER1uu8xchdzWv9ZfC+/fqB0ykW+Jk7o3qDERdENS9AEKvSjul2Eps+2UXqzWzhWJ8=    .wx2.qq.com /   2027-11-18T05:37:09.000Z    205         
webwxuvid   169d9b9e867f7ce99290e5a658c8c96eaec07f5ae4d14ae2e3d3d174e4c8708a2cd115eb5a4377b520310f1b02fb4ece    .wx2.qq.com /   2027-10-17T15:22:23.000Z    105         
wxloadtime  1511156229_expired  .wx2.qq.com /   2017-11-20T17:37:11.000Z    28          
wxpluginkey 1511138882  .wx2.qq.com /   2017-11-20T18:07:26.000Z    21          
wxuin   2528638641  .wx2.qq.com /   2017-11-23T06:07:26.000Z    15  

```


```
curl 'https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg?lang=zh_CN&pass_ticket=QVuxcqoB8N5nmLBfMuOVXDeN79b4zRw5NaVdGRXnFZJOds%252F93gkHv7ECndaBVb9H' -H 'Origin: https://wx2.qq.com' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: zh-CN,zh;q=0.9' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3269.3 Safari/537.36' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'Referer: https://wx2.qq.com/?&lang=zh_CN' -H 'Cookie: mm_lang=zh_CN; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; wxuin=2528638641; wxsid=kf9vUU8dP+Sarh/W; webwx_data_ticket=gScRCossRq2GWxxhOIv9HiH6; webwxuvid=962b08430a5a9b9f9147857d310982089dbe3dd630163b072c809436af655a1af5b76b7b04ba8b30c75a0fa4e88717f6; webwx_auth_ticket=CIsBEM/15NIIGoAB6rsQfkGRNEFhwJnNL1FnrsTvkY/DJ4JJtCVrDQM9wShL7cf79hdCrasnRdbdF0WWbrt4Yddu3/63cR/fFqnL/M0bMEzPsFX7xqTNiScSYzTI+kOvnSL1YIOtnTssAMFUk9iglCvJIt7a3a+C+pZWUqvSjul2Eps+2UXqzWzhWJ8=; login_frequency=1; last_wxuin=2528638641; wxloadtime=1511158176_expired; wxpluginkey=1511138882' -H 'Connection: keep-alive' --data-binary '{"BaseRequest":{"Uin":2528638641,"Sid":"kf9vUU8dP+Sarh/W","Skey":"@crypt_7c619c9c_619281977ca9dfed9d3b98c8624e344b","DeviceID":"e025040297203383"},"Msg":{"Type":1,"Content":"xiaomumu","FromUserName":"@c7f6cd063f25a0aaa14e5f9782518370f5a12a6012671f398cefd0933901aee5","ToUserName":"@814d01493c2373ee2ae72d4bf76dd09ef8071946b0e54a1b1e0d788718b7a717","LocalID":"15111581926450362","ClientMsgId":"15111581926450362"},"Scene":0}' --compressed


X_NOTIFY_STATE  1   wx2.qq.com  /   Session 19          
MM_WX_SOUND_STATE   1   wx2.qq.com  /   Session 18          
last_wxuin  2528638641  wx2.qq.com  /   2017-11-22T06:09:36.000Z    20          
login_frequency 1   wx2.qq.com  /   2017-11-22T06:09:36.000Z    16          
mm_lang zh_CN   .wx2.qq.com /   2017-11-20T18:09:36.000Z    12          
webwx_auth_ticket   CIsBEM/15NIIGoAB6rsQfkGRNEFhwJnNL1FnrsTvkY/DJ4JJtCVrDQM9wShL7cf79hdCrasnRdbdF0WWbrt4Yddu3/63cR/fFqnL/M0bMEzPsFX7xqTNiScSYzTI+kOvnSL1YIOtnTssAMFUk9iglCvJIt7a3a+C+pZWUqvSjul2Eps+2UXqzWzhWJ8=    .wx2.qq.com /   2027-11-18T06:09:36.000Z    205         
webwx_data_ticket   gScRCossRq2GWxxhOIv9HiH6    .qq.com /   2017-11-20T18:09:53.000Z    41          
webwxuvid   962b08430a5a9b9f9147857d310982089dbe3dd630163b072c809436af655a1af5b76b7b04ba8b30c75a0fa4e88717f6    .wx2.qq.com /   2027-11-18T06:09:36.000Z    105         
wxloadtime  1511158176_expired  .wx2.qq.com /   2017-11-20T18:09:37.000Z    28          
wxpluginkey 1511138882  .wx2.qq.com /   2017-11-20T18:09:53.000Z    21          
wxsid   kf9vUU8dP+Sarh/W    .wx2.qq.com /   2017-11-20T18:09:53.000Z    21          
wxuin   2528638641  .wx2.qq.com /   2017-11-23T06:09:53.000Z    15  


```

```
发送消息视图
'div[ng-controller="chatSenderController"]'

用户列表视图
angular.element(document.querySelector("body > div.main > div > div.panel > div:nth-child(6)")).scope()
angular.element(document.querySelector("#J_NavChatScrollBody > div > div:nth-child(2) > div")).scope()

聊天记录视图
#chatArea > div.scroll-wrapper.box_bd.chat_bd.scrollbar-dynamic > div.box_bd.chat_bd.scrollbar-dynamic.scroll-content.scroll-scrolly_visible > div.ng-scope > div:nth-child(4) > div > div > div > div > div

聊天记录视图
#chatArea > div.scroll-wrapper.box_bd.chat_bd.scrollbar-dynamic > div.box_bd.chat_bd.scrollbar-dynamic.scroll-content.scroll-scrolly_visible > div.ng-scope > div > div > div > div > div.content

// 
angular.element(document.querySelector("#chatArea > div.scroll-wrapper.box_bd.chat_bd.scrollbar-dynamic > div.box_bd.chat_bd.scrollbar-dynamic.scroll-content.scroll-scrolly_visible > div.ng-scope")).scope()
angular.element(document.querySelector('#J_NavChatScrollBody > div > div:nth-child(3) > div')).scope();

{"type":"chat","username":"@a27821f77c5bf864359c6960baad7c1c56313500f863e561f5c2cdd9df169ca4"}
```


```
hook 微信消息处理函数
function hookFunction(object, functionName, callback) {
    (function(originalFunction) {
        object[functionName] = function () {
            var returnValue = originalFunction.apply(this, arguments);

            callback.apply(this, [returnValue, originalFunction, arguments]);

            return returnValue;
        };
    }(object[functionName]));
}



hookFunction(angular.element(document.body).injector().get('chatFactory'), 'messageProcess', function(e){
  console.log("PPP-process-hookFunction-v3");
  console.log(e);
});
```

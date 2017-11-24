memo
----
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

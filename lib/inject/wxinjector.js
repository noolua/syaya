WXInjector = (function(){
  var utils = {
    hookFunction: function(obj, name, cb) {
      var origin = obj[name];
      obj[name] = function(){
        return cb.apply(this, arguments);
      }
      return origin;
    },
    unhookFunction: function(obj, name, func){
      obj[name] = func;
    },
  };

  var injector = angular.element(document.body).injector();
  var F = {
    chatFactory:injector.get('chatFactory'),
    contactFactory:injector.get('contactFactory'),
    confFactory:injector.get('confFactory'),
    loginFactory:injector.get('loginFactory'),
    accountFactory:injector.get('accountFactory'),
  }

  var bot = {
    messages:[],
    old_message_process:utils.hookFunction(F.chatFactory, 'messageProcess', function(e){
      console.log("WXBOT-hooked call", e);
      bot.messages.push(e);
      return bot.old_message_process.apply(this, arguments);
    }),
    send_txt_message:function(user, msg){
      var a = angular.element(document.querySelector("#editArea")).scope();
      a.editAreaCtn = msg;
      var e = F.chatFactory.createMessage({
        ToUserName:user,
        MsgType: F.confFactory.MSGTYPE_TEXT,
        Content: a.editAreaCtn
      });
      F.chatFactory.appendMessage(e),
      F.chatFactory.sendMessage(e),
      a.editAreaCtn = "";
      return 0;
    },
    is_chating:function(){
      var ret = false;
      var skey = F.accountFactory.getSkey();
      if(skey != ""){
        return true;
      }
    },
    qrcode_url:function(){
      var img = document.querySelector("body > div.login.ng-scope > div.login_box > div.qrcode > img");
      if(img){
        return img.src;
      }
      return null;
    },
    contacts:function(){

    },
    logout:function(){
      F.loginFactory.loginout();
    },
  };
  (()=>{
    /*Fixed window writable*/
    console.log("Fixed window writable");
    Object.defineProperties(window, {
      onunload: {
        enumerable: true,
        writable: true,
        value: null
      },
      onbeforeunload: {
        enumerable: true,
        writable: true,
        value: null
      }
    });
  })();
  return bot;
})();

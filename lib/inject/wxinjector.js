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
    utilFactory:injector.get('utilFactory'),
  }

  var bot = {
    messages:[],
    old_message_process:utils.hookFunction(F.chatFactory, 'messageProcess', function(e){
      var is_cap = false;
      var t = this, a = F.contactFactory.getContact(e.FromUserName, "", !0);
      if (!a || a.isMuted() || a.isSelf() || a.isShieldUser() || a.isBrandContact() || e.MsgType == F.confFactory.MSGTYPE_STATUSNOTIFY){
        is_cap = false;
      }
      if (e.MsgType != F.confFactory.MSGTYPE_SYSNOTICE && !(F.utilFactory.isShieldUser(e.FromUserName) || F.utilFactory.isShieldUser(e.ToUserName) || e.MsgType == F.confFactory.MSGTYPE_VERIFYMSG && e.RecommendInfo && e.RecommendInfo.UserName == F.accountFactory.getUserInfo().UserName)) {
        switch (e.MsgType){
          case F.confFactory.MSGTYPE_TEXT:
          case F.confFactory.MSGTYPE_TEXT:
          case F.confFactory.MSGTYPE_IMAGE:
          case F.confFactory.MSGTYPE_VOICE:
          case F.confFactory.MSGTYPE_VIDEO:
          case F.confFactory.MSGTYPE_MICROVIDEO:
          case F.confFactory.MSGTYPE_EMOTICON:
          case F.confFactory.MSGTYPE_APP:
          case F.confFactory.MSGTYPE_VOIPMSG:
          case F.confFactory.MSGTYPE_VOIPNOTIFY:
          case F.confFactory.MSGTYPE_VOIPINVITE:
          case F.confFactory.MSGTYPE_LOCATION:
          case F.confFactory.MSGTYPE_POSSIBLEFRIEND_MSG:
          case F.confFactory.MSGTYPE_VERIFYMSG:
          is_cap = true;
          break;
        }
      }
      if(is_cap){
        console.log("capture message", e);
        bot.messages.push(e);
      }
      return bot.old_message_process.apply(this, arguments);
    }),
    send_txt_message:function(user, msg){
      var ret = -1, to = F.contactFactory.getContact(user, "", !0);
      if(to){
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
        ret = 0;
      }
      return ret;
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

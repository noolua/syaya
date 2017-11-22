var WXBot = (function(){
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
        ToUserName:ToUserName,
        MsgType: F.confFactory.MSGTYPE_TEXT,
        Content: a.editAreaCtn
      });
      F.chatFactory.appendMessage(e),
      F.chatFactory.sendMessage(e),
      a.editAreaCtn = "";
      return 0;
    },
    logout:function(){
      F.loginFactory.loginout();
    },
  };
  return bot;
})();

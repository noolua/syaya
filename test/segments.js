/*
微信controllers

appController
  angular.element(document.querySelector("body")).scope()
loginController
  angular.element(document.querySelector("body > div.login.ng-scope")).scope()
chatSenderController
  angular.element(document.querySelector("#chatArea > div.box_ft.ng-scope")).scope()
*/


function GetAllContacts(){
  return angular.element(document.body).injector().get('contactFactory').getAllContacts();
}

// SendMessage("@a88617f9eb30e615df0ba19b66531afcb8f3333db5d54567872acd0bf39ec3e0", "hello-中年油腻难: "+Date());
function SendMessage(ToUserName, msg){
  var a = angular.element(document.querySelector("#editArea")).scope();
  var confFactory = angular.element(document.body).injector().get('confFactory')
  var chatFactory = angular.element(document.body).injector().get('chatFactory');
  a.editAreaCtn = msg;
  var e = chatFactory.createMessage({
    ToUserName:ToUserName,
    MsgType: confFactory.MSGTYPE_TEXT,
    Content: a.editAreaCtn
  });
  chatFactory.appendMessage(e),
  chatFactory.sendMessage(e),
  // O[chatFactory.getCurrentUserName()] = "",
  a.editAreaCtn = "";
}

function Get_Message(){
// angular.element(document.querySelector("#chatArea > div.scroll-wrapper.box_bd.chat_bd.scrollbar-dynamic > div.box_bd.chat_bd.scrollbar-dynamic.scroll-content.scroll-scrolly_visible > div.ng-scope")).scope()

}

// GetAllUsers();
// SendMessage(Date());

function hookFunction(obj, name, cb) {
  var origin = obj[name];
  obj[name] = function(){
    return cb.apply(this, arguments);
  }
  return origin;
}

function unhookFunction(obj, name, func){
  obj[name] = func;
}

var old_message_process = hookFunction(angular.element(document.body).injector().get('chatFactory'), 'messageProcess', function(e){
  console.log("hooked call", e);
  return old_message_process.apply(this, arguments);
});



var img = document.querySelector("body > div.login.ng-scope > div.login_box > div.qrcode > img");

function getBase64Image_001(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  img.setAttribute("crossOrigin",'Anonymous');
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");
  // img.setAttribute('crossOrigin', '');
  console.log(dataURL);
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getBase64FromImageUrl(url) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        console.log(dataURL);
        // alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };
    img.src = url;
}

getBase64FromImageUrl(document.querySelector("body > div.login.ng-scope > div.login_box > div.qrcode > img").src);




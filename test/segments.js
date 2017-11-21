function GetAllContacts(){
  return angular.element(document.body).injector().get('contactFactory').getAllContacts();
}

function SendMessageTo(nick, msg){
  var search = document.querySelector("#search_bar > input").innerText = "叶勤";
  search.innerText = "叶勤";
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

'use strict';

var Nightmare = require('nightmare');
const WX_HELPER_JS = "lib/inject/wxinjector.js";
const WX_WEB_URL = "https://wx2.qq.com/?&lang=zh_CN";

var _B = {
  BOT_STATUS_LOGING:1,
  BOT_STATUS_CHATING:2,
  BOT_STATUS_CLOSE:3,
};

var _bot = {
  status:_B.BOT_STATUS_CLOSE,
  page:null,
};


async function bot_login(debug){
  if(_bot.status == _B.BOT_STATUS_LOGING && _bot.page != null){
    return true;
  }
  if(_bot.status != _B.BOT_STATUS_CLOSE && _bot.page != null){
    return false;
  }
  var page = {};
  page.engin = ((debug) => {
    var options = {
      show: true,
      waitTimeout:Infinity,
      openDevTools: {
        mode: 'detach'
      }
    };
    if (debug){
      console.log("debug mode");
      return new Nightmare(options);
    }
    return new Nightmare({});
  })(debug);

  console.log("goto: ", WX_WEB_URL);
  page.engin.on('dom-ready', function () {
    console.log("DOM-READY for inject...");
    page.engin.inject("js", WX_HELPER_JS);
  });
  await page.engin.goto(WX_WEB_URL);
  await page.engin.wait(2000);

  _bot.page = page;
  _bot.status = _B.BOT_STATUS_LOGING;
  _bot.tm_check = setInterval(async function(){
    var tm_clear = false;
    if(_bot.status == _B.BOT_STATUS_LOGING && _bot.page != null){
      var login_success = await _bot.page.engin
      .evaluate(() => {
        return WXInjector.wait_for_qrcode_scan();
      })
      .then((r) => {
        return r;
      });
      if(login_success && _bot.status == _B.BOT_STATUS_LOGING){
        _bot.status = _B.BOT_STATUS_CHATING;
        console.log("wexin in chatroom");
        tm_clear = true;
      }else{
        console.log("cheking...: " + Date());
      }
    }
    if(tm_clear){
      console.log("clear timer");
      clearInterval(_bot.tm_check);
    }
  }, 2000);

  return true;
}

async function bot_logout(){
  var ret = false;
  if(_bot.status != _B.BOT_STATUS_CLOSE && _bot.page != null){
    if(_bot.status == _B.BOT_STATUS_CHATING && _bot.page != null){
      console.log("logout from web-chating");
      ret = await _bot.page.engin
      .evaluate(() => {
        WXInjector.logout();
        return 0;
      })
      .then((r) => {
        return true;
      });
    }
    await _bot.page.engin.wait(5000);
    ret = await _bot.page.engin.end().then((_) =>{
      console.log("weixin page close");
      return true;
    });
    _bot.status = _B.BOT_STATUS_CLOSE;
    _bot.page = null;
  }
  return ret;
}

async function bot_status(){
  return _bot.status;
}

async function bot_query_qrcode_URL(){
  if(_bot.status != _B.BOT_STATUS_LOGING || _bot.page == null){
    return null;
  }
  var URL = _bot.page.engin
  .evaluate(()=>{
    return WXInjector.qrcode_url();
  })
  .then((r) => {
    return r;
  });
  return URL;
}

async function bot_query_messages(){
  var messages = [];
  if(_bot.status != _B.BOT_STATUS_CHATING || _bot.page == null){
    return messages;
  }
  messages = await _bot.page.engin
  .evaluate(() => {
    return WXInjector.fetch_messages();
  })
  .then((r) => {
    return r;
  });

  return messages;
}

async function bot_query_account(){
  var info = null;
  if(_bot.status != _B.BOT_STATUS_CHATING || _bot.page == null){
    return info;
  }
  info = await _bot.page.engin
  .evaluate(() => {
    return WXInjector.query_account();
  })
  .then((r) => {
    return r;
  });
  return info;
}

async function bot_query_contacts(type){
  var contacts = null;
  if(_bot.status != _B.BOT_STATUS_CHATING || _bot.page == null){
    return contacts;
  }
  contacts = await _bot.page.engin
  .evaluate((t) => {
    return WXInjector.query_contacts(t);
  }, type)
  .then((r) => {
    return r;
  });
  return contacts;
}

async function bot_send_txt_message(user, msg){
  var ret = false;
  if(_bot.status != _B.BOT_STATUS_CHATING || _bot.page == null){
    return ret;
  }
  ret = await _bot.page.engin.evaluate((u, m) => {
    var res = WXInjector.send_txt_message(u, m);
    return res;
  }, user, msg)
  .then((r) => {
    return r;
  });
  return ret;
}

module.exports.login = bot_login;
module.exports.logout = bot_logout;
module.exports.login_qrcode = bot_query_qrcode_URL;
module.exports.query_messages = bot_query_messages;
module.exports.query_account = bot_query_account;
module.exports.query_contacts = bot_query_contacts;
module.exports.send_txt_message = bot_send_txt_message;





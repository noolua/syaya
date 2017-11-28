'use strict';
var request = require("request");
var path = require("path");
var util = require("util");
var co = require("co");
var cfg = require(path.resolve(__dirname, "./conf/", "service.json"));
var wxconf = require(path.resolve(__dirname, "./conf/", "wxconf.js"));

var A = {
  API_WX_LOGIN:cfg.host + "/api/bot/login",
  API_WX_LOGOUT:cfg.host + "/api/bot/logout",
  API_WX_QRCODE:cfg.host + "/api/bot/qrcode",
  API_WX_QUERY_MESSAGES:cfg.host + "/api/bot/query_messages",
  API_WX_QUERY_ACCOUNT:cfg.host + "/api/bot/query_account",
  API_WX_QUERY_CONTACTS:cfg.host + "/api/bot/query_contacts",
  API_WX_SEND_TXT_MESSAGE:cfg.host + "/api/bot/send_txt_message",
  API_UTIL_QUERY_WEATHER:cfg.host + "/api/query_weather",
}

function _fetch_json(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve({error:0, body:body});
      } else {
        reject({error:-1, body:util.format("_fetch_json error, '%s'", url)});
      }
    });
  })
  .catch((err) => {
    return err;
  });
}

function _post_json(url, r){
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(r)
    },
    (error, res, body) => {
      if (!error && res.statusCode == 200) {
        resolve({error:0, body:body});
      } else {
        reject({error:-1, body:util.format("_post_json error, '%s'", url)});
      }
    })
  }).catch((err) => {
    return err;
  });
}

async function _fetch_api(url){
  var r = await _fetch_json(url);
  if(r.error == 0){
    return JSON.parse(r.body);
  }
  return null;
}

var bot = {status:"close", tick:90};

async function _sleep(ms) {
  return new Promise(resolve => {
    var tm = setTimeout(() => {
      clearTimeout(tm);
      resolve(0);
    }, ms);
  });
}

bot.wait_for_login =  async function(){
  console.log("loging... ...");
  var r = await _fetch_api(A.API_WX_LOGIN);
  if(r){
    console.log(r);
    while(true){
      r = await _fetch_api(A.API_WX_QUERY_ACCOUNT);
      if(r.error == 0){
        console.log(r.info.NickName);
        console.log(r.info.UserName);
        console.log("login success");
        bot.UserName = r.info.UserName;
        break;
      }
      await _sleep(2000);
    }
  }
  return 0;
}

bot.wait_for_logout = async function(){
  console.log("logout ... ...");
  return _fetch_api(A.API_WX_LOGOUT);
}

bot.messages_process = async function(){
  while(bot.tick-- >= 0){
    await _sleep(1000);
    var r = await _fetch_api(A.API_WX_QUERY_MESSAGES);
    var quene = [];
    if(r.error == 0){
      r.messages.forEach(msg => {
        // GET TXT_MESSAGE
        if(msg.MsgType == wxconf.MSGTYPE_TEXT && msg.SubMsgType == 0 && bot.UserName != msg.FromUserName){
          quene.push(msg);
        }
      });
    }
    quene.forEach(msg => {
      co(function*(m){
        var url = util.format(A.API_UTIL_QUERY_WEATHER + "?city=%s", encodeURIComponent(m.Content));
        // console.log("URL: ", url);
        var r = yield _fetch_api(url);
        var reply = "没有查到这个城市的天气呢";
        if(r.error == 0){
          reply = "";
          r.data.forEach(o => {
            reply = reply + util.format("%s, 当前气温%s度，%s, 湿度%s, 能见度%s, 空气质量%s\n", o.city,
              o.now.temp != "" ? o.now.temp : "N/A",
              o.now.WD != "" ? o.now.WD : "风力未知",
              o.now.SD != "" ? o.now.WD : "未知",
              o.now.njd != "" ? o.now.njd : "未知",
              o.now.aqi != "" ? o.now.aqi : "未知");
          });
        }
        var rep = {user:m.FromUserName, msg:reply.replace(/'/g, "")};
        console.log(JSON.stringify(rep));
        r = yield _post_json(A.API_WX_SEND_TXT_MESSAGE, rep);
        console.log(r);
      }, msg)
    });
  }
}

async function main() {
  await bot.wait_for_login();
  await bot.messages_process();
  await bot.wait_for_logout();
}

main();

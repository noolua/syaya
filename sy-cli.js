'use strict';
var request = require("request");
var path = require("path");
var util = require("util");
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

async function _fetch_api(url){
  var r = await _fetch_json(url);
  if(r.error == 0){
    return JSON.parse(r.body);
  }
  return null;
}

var bot = {status:"close", tick:30};

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
    var r = _fetch_api(A.API_WX_QUERY_MESSAGES);
  }
}

async function main() {
  await bot.wait_for_login();
  await bot.messages_process();
  await bot.wait_for_logout();
}

main();

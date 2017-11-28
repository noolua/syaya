'use strict';

var request = require("request"),
    path = require("path"),
    util = require("util"),
    CITIES = require(path.resolve(__dirname, "../conf/", "cities.json"));

const API_WAETHER_NOW = "http://d1.weather.com.cn/sk_2d/%s.html";
const API_WAETHER_NOW_RE = /\{.*\}/i;

function _fetch_data(url) {
  return new Promise(function (resolve, reject) {
    var options = {
      url: url,
      headers: {
      'Referer': 'http://www.weather.com.cn'
      }
    };
    request(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve({error:0, body:body});
      } else {
        reject({error:-1, body:util.format("_fetch_data error, '%s'", options.url)});
      }
    });
  })
  .catch((err) => {
    return err;
  });
}

function _safe_parse(jsonp){
  var res = jsonp.match(API_WAETHER_NOW_RE) || ["{}"];
  var j = res[0];
  var obj = null;
  try {
    obj = JSON.parse(j);
  }catch(e){
    console.log('_safe_parse error');
    obj = {};
  }
  return obj;
}

async function query_weather(city){
  var slot = CITIES[city];
  var res = {error:-1, data:[]};
  if(slot){
    for(var idx in slot){
      var c = slot[idx];
      var url = util.format(API_WAETHER_NOW, c.code);
      var r_now = await _fetch_data(url);
      if(r_now.error == 0){
        res.error = 0;
        var r = {
          city : util.format("%s - %s", c.province, city),
          now : r_now.error == 0 ? _safe_parse(r_now.body) : {}
        }
        res.data.push(r);
      }
    }
  }

  return res;
}

module.exports.query_weather = query_weather;

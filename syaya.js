
var express = require('express');
var bodyParser = require('body-parser');
var bot = require("./lib/wxbot");
var app = express();

// app.use(bodyParser.json({limit: '100kb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.json({
  limit: '100kb',
  type: 'application/x-www-form-urlencoded'
}));

app.get('/api/version', function(req, res){
  var rs = {error:0, version:"0.0.1", author:"rockee"};
  res.send(JSON.stringify(rs));
})


app.get('/api/bot/login', async function(req, res){
  var r = {error:-1, msg:"error for login"};
  if(await bot.login(true) == true){
    r.error = 0;
    r.qrcode = await bot.login_qrcode();
  }
  res.send(JSON.stringify(r));
})

app.get('/api/bot/logout', async function(req, res){
  var r = {error:-1, msg:"error for logout"};
  if(await bot.logout() == true) {
    r.error = 0;
    r.msg = "logout success";
  }
  res.send(JSON.stringify(r));
})

app.get('/api/bot/qrcode', async function(req, res){
  var r = {error:-1, msg:"qrcode not found"};
  r.qrcode = await bot.login_qrcode();
  if(r.qrcode){
    r.error = 0;
    r.msg = "success";
  }
  res.send(JSON.stringify(r));
})

app.get('/api/bot/query_messages', async function(req, res){
  var r = {error:-1, msg:"messages is zero"};
  r.messages = await bot.query_messages();
  if(r.messages.length > 0){
    r.error = 0;
    r.msg = "success";
  }
  res.send(JSON.stringify(r));
})

app.get('/api/bot/query_account', async function(req, res){
  var r = {error:-1, info:{}};
  r.info = await bot.query_account();
  if(r.info){
    r.error = 0;
  }
  res.send(JSON.stringify(r));
})

app.get('/api/bot/query_contacts', async function(req, res){
  var r = {error:-1, contacts:{}};
  r.contacts = await bot.query_contacts();
  if(r.contacts){
    r.error = 0;
  }
  res.send(JSON.stringify(r));
})

app.post('/api/bot/send_txt_message', async function(req, res){
  var user = req.body.user;
  var msg = req.body.msg;
  var r = {error:-1, msg:"send fail"};
  r.status = await bot.send_txt_message(user, msg);
  if(r.status){
    r.error = 0;
    r.msg = "success";
  }
  res.send(JSON.stringify(r));
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("browser http://%s:%s", host, port)
})

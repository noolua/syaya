
var express = require('express');
var bodyParser = require('body-parser');
var upstream = require("./lib/upstream");
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

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("browser http://%s:%s", host, port)
})

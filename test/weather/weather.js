
var fs = require("fs");
var path = require("path");
var CITIRES = require(path.resolve(__dirname, "./", "chinacities.json")).chinacities;


var VIEW = {}
for(var idx in CITIRES){
  var c = CITIRES[idx];
  if(c){
    var key = c.city;
    var recored = {code:c.citycode, pinyin:c.city_pinyin, province:c.province};
    var slot = VIEW[key] || [];
    slot.push(recored);
    VIEW[key] = slot;
  }
}

var j = JSON.stringify(VIEW);

var writable = fs.createWriteStream('cities.json',{
  flags: 'w',
  defaultEncoding: 'utf8',
  mode: 0666,
});


writable.on('finish', function(){
  console.log('write finished');
  process.exit(0);
});

writable.on('error', function(err){
  console.log('write error - %s', err.message);
});

writable.write(j, 'utf8');

writable.end();

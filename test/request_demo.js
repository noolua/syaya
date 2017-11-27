var request = require("request");
function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve({error:0, body:body});
      } else {
        reject({error:1, body:"doRequest fail."});
      }
    });
  })
  .catch((err) => {
    return err;
  });
}

// Usage:

async function demo_for_do_request() {
  let url = "http://baidu.com";
  let res = await doRequest(url);
  if(res.error == 0){
    console.log(res.body);
  }else{
    console.log(res.body);
  }
}

function demo_for_timer_loop(){
  var tick = 5;
  var tm = setInterval(() => {
    console.log("tick: ", tick--);
    if(tick == 0){
      console.log("clearInterval");
      clearInterval(tm);
    }
  }, 1000);
}

// demo_for_timer_loop();

async function sleep(ms) {
  return new Promise(resolve => {
    var tm = setTimeout(() => {
      console.log("clear", tm);
      clearTimeout(tm);
      resolve(0);
    }, ms);
  });
}

async function mmm(){
  var r =  await sleep(2000);
  console.log(r);

}
mmm();

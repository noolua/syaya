var Nightmare = require('nightmare');
const WX_HELPER_JS = "lib/wxhelper.js";

const page_create = ((debug) => {
  var _page = {url:"https://wx2.qq.com/?&lang=zh_CN"};
  _page.engin = ((debug) => {
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

  _page.load = (() => {
    console.log("load: ", _page.url);
    _page.engin.goto(_page.url);
    _page.engin.wait(3000);
    _page.engin.inject("js", WX_HELPER_JS);
    console.log("load done");
  });

  _page.extract_messages = (() => {
    return _page.engin.evaluate(() => {
      var res = WXBot.messages;
      WXBot.messages = [];
      return res;
    })
    .then((r) => {
      return r;
    });
  });

  _page.send_txt_message = ((user, msg) => {
    return _page.engin.evaluate((u, m) => {
      var res = WXBot.send_txt_message(u, m);
      return res;
    }, user, msg)
    .then((r) => {
      return r;
    });
  });

  _page.version = (() => {
    console.log("0.0.1a");
  });

  _page.close = (() =>{
    _page.engin.evaluate(() => {
      WXBot.logout();
    })
    .then((_) => {
    });
    _page.engin.wait(5000);
    _page.engin.end().then((_) =>{
      console.log("page close");
    });
  });

  return _page;
});

module.exports.page_create = page_create;


var Nightmare = require('nightmare');

var eng_release_options = {};
var eng_options = eng_release_options || {
  show: true,
  openDevTools: {
    mode: 'detach'
  },
};

var engin = new Nightmare(eng_options);

const login = function (){

}

const reg_event_listener = function(){

}

const fire_action = function(action){

}

const logout = function (){

}

// 下面两个config可以不设置，可以取得更好的效率
const page_create = function(){
  var page = {};
  page.engin = new Nightmare({
    show: true,
    openDevTools: {
      mode: 'detach'
    },
  });

  page.extract_title = function(url){
    return page.engin
    .goto(url)
    .evaluate(function(){
      return document.title;
    })
    .then(val => {
      return val || "N/A TITLE";
    })
    .catch(err =>{
      console.log("gPageTitle Err: " + err);
    })
  }
  page.extract_article = function(url){
    return page.engin
    .goto(url)
    .inject("js", "lib/inject/reader_check.js")
    .evaluate(function(){
      var r = ReaderArticleFinderJS;
      if(!r.adoptableArticle()){
        r.isReaderModeAvailable();
      }
      var article = r.adoptableArticle();
      if(article){
        return {
          title:r.articleTitle() || document.title,
          body:r.article.element.outerHTML || "<div>NULL-BODY</div>",
          url:document.baseURI,
        };
      }
      return {title:document.title, body:"<div>adoptableArticle-null</div>", url:document.baseURI};
    })
    .then(ar => {
      return ar;
    })
    .catch(err =>{
      console.log("gPageTitle Err: " + err);
    })
  }

  page.close = function () {
    page.engin
    .end()
    .then(_ => {
      console.log('end up the tasks');
    })
  }

  return page;
}


// module.exports.page_title = page_title;
// module.exports.page_article = page_article;
// module.exports.close = close;
module.exports.page_create = page_create;

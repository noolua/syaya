天气查询测试
----------

#### 数据源
  - 城市代码列表 [http://mobile.weather.com.cn/js/citylist.xml](http://mobile.weather.com.cn/js/citylist.xml)
  - 城市实时天气接口：http://d1.weather.com.cn/sk_2d/{{citycode}}.html
  - 城市编码IP查询接口：http://wgeo.weather.com.cn/ip/?_=math.random
 
#### 查询接口测试
> curl 'http://d1.weather.com.cn/sk_2d/101270101.html'  -H 'Referer: http://www.weather.com.cn' 

```js
var dataSK = {"nameen":"chengdu","cityname":"成都","city":"101270101","temp":"13","tempf":"55","WD":"西南风","wde":"SW ","WS":"1级","wse":"&lt;12km/h","SD":"63%","time":"15:00","weather":"阴","weathere":"Overcast","weathercode":"d02","qy":"956","njd":"19.48km","sd":"63%","rain":"0","rain24h":"0","aqi":"147","limitnumber":"1和6","aqi_pm25":"147","date":"11月27日(星期一)"}
```


#### 参考
 - [在线XML、JSON数据互转](https://www.bejson.com/xml2json/)
 - [有哪些免费开放且收录城市较完整的天气 API 接口](https://www.zhihu.com/question/20521716)

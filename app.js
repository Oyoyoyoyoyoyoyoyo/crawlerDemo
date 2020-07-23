
var Crawler = require("crawler")
var schedule = require('node-schedule');
var fs = require("fs")

/**
 * @description: 生成json数据
 * @param {type} 
 * @return: 
 */
const downloadJson=()=>{
    var data = {
        a: 11,
        b: [{ a: 1, b: 3 }]
    }
    let str = JSON.stringify(data,null,"\t")
    
    fs.writeFile('data.json', str, function (err) {
        if (err) { res.status(500).send('Server is error...') }
    })
}

/**
 * @description: 定时器
 * @param {type} 
 * @return: 
 */
const scheduleCronstyle = () => {
    //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('1 * * * * *', () => {
        startCrawler();
    });
}


/**
 * @description: 抓取函数
 * @param {type} 
 * @return: 
 */
const startCrawler = () => {
    var c = new Crawler({
        // 在每个请求处理完毕后将调用此回调函数
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                console.log(res.body);
                var $ = res.$;
                // $ 默认为 Cheerio 解析器
                // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
                // console.log($("title").text());
            }
            done();
        }
    });

    c.queue('https://getman.cn/api/request');
}

scheduleCronstyle();
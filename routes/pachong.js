var request=require("request") ;
var cheerio = require('cheerio') ;

request('http://36kr.com/',function(err,rqs,body)
    {

        if(!err)
        {
            console.log('http://36kr.com/') ;


            $ = cheerio.load(body);//当前body 前端选择器

           // $ = cheerio.load($('.explist').html());//当前body 前端选择器


            console.log($.html())
            //
            //for(var i=0;i<$('li').length ;i++  ) {
            //
            //    console.log($('li h3 a')[i].attribs.href);
            //    console.log($('li h3 a')[i].attribs.title);
            //
            //}

        }
    }
)
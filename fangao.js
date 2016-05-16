var wechat = require('wechat');
var OAuth = require('wechat-oauth');


var API = require('wechat-api');

/*
 测试号菜单
 */

var api = new API("wx9457c1b8ec6bdcaa","588244e49df2d3762bfeb620683dc699");

function postmenu(callback) {

    var data ={
        "button": [
            {
                "name": "首页",
                "type": "view",
                "url": "http://wechat.funfungolf.com/getauthorizeurl/fungao/?url=http://tourism.funfungolf.com/"
            },
            {
                "name": "我的",
                "type": "view",
                "url": "http://wechat.funfungolf.com/getauthorizeurl/fungao/?url=http://tourism.funfungolf.com/my"
            }

        ]
    }

    api.createMenu(data, callback);

}

postmenu(function(err,v)
    {
        console.log(err,v) ;
    }
) ;

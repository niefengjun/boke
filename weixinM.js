


var API = require('wechat-api').API;
/*
 测试号菜单
 */

var api = new API("wxe01b23fa51508d70","b3e0ffbe949b5b28c4aef2c72323efec");


function postmenu(callback) {


    var data ={
        "button": [
            {
                "name": "首页",
                "type": "view",
                "url": "http://www.niefengjun.cn/getauthorizeurl/niefengjun/?url=/index"
            },
            {
                "name": "预约",
                "type": "view",
                "url": "http://www.niefengjun.cn/getauthorizeurl/niefengjun/?url=/nodejs/"
            },


            {
                "name": "我的",
                // "type": "view",
                //"url": "http://pay-test.jiankangdoctor.com/getauthorizeurl/shoudaotest/?url=/wode/"


                "sub_button": [

                    {
                        "type": "view",
                        "name": "个人中心",
                        "url": "http://pay-test.jiankangdoctor.com/getauthorizeurl/shoudaotest/?url=/wode/"
                    },

                    {
                        "type": "view",
                        "name": "我是技师",
                        "url": "http://pay-test.jiankangdoctor.com/getauthorizeurl/shoudaotest/?url=http://jishi-test.jiankangdoctor.com/login/2/"
                    }
                    , {
                        "type": "view",
                        "name": "我是店长",
                        "url": "http://pay-test.jiankangdoctor.com/getauthorizeurl/shoudaotest/?url=http://jishi-test.jiankangdoctor.com/login/1/"
                    }
                ]
            }

        ] }

    api.createMenu(data, callback);

}

postmenu(function(err,v)
    {
        console.log(err,v) ;
    }
) ;


exports.postmenu = postmenu;
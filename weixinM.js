


var API = require('wechat-api');
/*
 测试号菜单
 */

var api = new API("wx5cf362bf73906352","7557e541b12836e4af8a34210206d85c");


function postmenu(callback) {


    var data ={
        "button": [
            {
                "name": "首页",
                "type": "view",
                "url": "http://www.niefengjun.cn/weixin/getauthorizeurl/niefengjun/?url=/index"
            },
            {
                "name": "nodejs",
                "type": "view",
                "url": "http://www.niefengjun.cn/weixin/getauthorizeurl/niefengjun/?url=/category/nodejs.html/"
            },


            {
                "name": "我的",
                // "type": "view",
                //"url": "http://pay-test.jiankangdoctor.com/getauthorizeurl/shoudaotest/?url=/wode/"


                "sub_button": [


                    {
                        "type": "view",
                        "name": "测试",
                        "url": "http://www.niefengjun.cn/weixin/getauthorizeurl/niefengjun/?url=/test/"
                    },
                    {
                        "type": "view",
                        "name": "nodejs",
                        "url": "http://www.niefengjun.cn/weixin/getauthorizeurl/niefengjun/?url=/category/nodejs.html/"
                    },


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
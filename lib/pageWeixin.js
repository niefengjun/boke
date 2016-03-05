var OAuth = require('wechat-oauth');
var fs = require('fs');
var async = require('async');
var tool = require('./tool');
var config = require('./config');

var wechat = require('wechat');
var tool = require('./tool');
var fs = require('fs');
var wxAPI = require('wechat-api');
//生成访问连接
function getAuthorizeURL(req, res) {
    var id = req.params.id;
    var weixinid = 'wx_' + id;

    if(!id)
    {
        id="shoudao" ;
    }
    var weixinconfig = config.config[weixinid];
    var url = req.query.url;
    console.log('登陆前'+url) ;


    var oauth = new OAuth(weixinconfig.appid, weixinconfig.appsecret, function (openid, callback) {
        // 传入一个获取全局token的方法\

        fs.readFile('./token/' + openid + 'AccessToken_' + id + '.txt', 'utf8', function (err, txt) {
            //console.log(err, txt);
            if (err) {
                return callback(err);
            }
            callback(null, JSON.parse(txt));
        })

    }, function (openid, token, callback) {

        fs.writeFile('./token/' + openid + 'AccessToken_' + id + '.txt', JSON.stringify(token), callback);
    });
    var oauthuser = weixinconfig.urldomain+"weixin/getaccesstoken/"+id + "/";

    var state = req.query.state;
    if (!state) {
        state ='niefengjun';
    }else
    {
        state=id ;
    }
    oauth.setOpts({timeout: 150000}); //设置超时时间

    res.cookie("niefengjun.cn", url, {maxAge: 86400000});



    if (oauthuser && state) {
        console.log('参数',oauthuser,state);
        var returl = oauth.getAuthorizeURL(oauthuser, state, 'snsapi_base');
        console.log('生成连接' ,returl) ;
        res.redirect(returl);
    }
    else {
        res.send('参数出错');
    }
}
//根据code 获取用户信息
function getAccessToken(req, res) {
    var id = req.params.id;
    var weixinid = 'wx_' + id;
    var weixinconfig = config.config[weixinid];

    var code = req.query.code;
    var state = req.query.state;
    var nickname;
    var updatenickename=false ;
    var openid;
    var refresh_token ;
    var access_token ;
    var i_account_bound ;
    var usercooke = {};

    var url=req.cookies["niefengjun.cn"] ;


    var oauth = new OAuth(weixinconfig.appid, weixinconfig.appsecret, function (openid, callback) {
        // 传入一个获取全局token的方法

        fs.readFile('./token/' + openid + 'AccessToken_' + id + '.txt', 'utf8', function (err, txt) {
            //console.log(err, txt);
            if (err) {
                return callback(err);
            }
            callback(null, JSON.parse(txt));
        })

    }, function (openid, token, callback) {

        // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
        // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
        fs.writeFile('./token/' + openid + 'AccessToken_' + id + '.txt', JSON.stringify(token), callback);
    });

    var callurl = weixinconfig.callURL;

    oauth.setOpts({timeout:150000}); //设置超时时间
    console.log('注册code---',code)

    oauth.getAccessToken(code, function (err, result) {
        var  i_account_source=id ;
        console.log("根据code 获取openid",err,result) ;
        if (!err) {

            openid = result.data.openid;
            refresh_token = result.data.refresh_token;
            access_token = result.data.access_token;
            i_account_bound=result.data.unionid;
            usercooke.refresh_token = refresh_token;
            usercooke.access_token = access_token;
            usercooke.i_account_bound = i_account_bound;
            usercooke.openid=openid ;
            res.cookie("niefengjunuser", url, {maxAge: 86400000});

                if(url) {
                    console.log('跳转成功'+url) ;
                    res.redirect(url);
                }
                else{
                    console.log('进pay'+url) ;
                    res.redirect("/");
                }

        }
        else {
            console.log('报错了',err,result) ;
            res.send('-1');
        }
    })
}

//监测用户登录
function  checkLogin (req, res, next) {
    var url = req.originalUrl;
    console.log(url) ;
    if (req.ip == '127.0.0.1') {
        next();
    }else {
        if (!(url.indexOf('/style') > -1 )) {
            if (req.cookies["jiankangweb"]) {
                next()
            } else {
                res.redirect("/getauthorizeurl/"+wxconfig.config.mp+"/?url=" + url);
            }


        } else {

            next();
        }
    }
}






function checkinfo(req, res, next) {
    var getip = tool.getClientIp(req);
    if (config.iplist.indexOf(getip) > -1) {
        next() ;
    } else {

        var info = {code: 1002, info: "ip限制"};
        res.send(info)
        res.end();

    }

}
//微信接入
exports.index = function (req, res, next) {

    var id = req.params.id;
    var weixinid = 'wx_' + id;
    var weixinconfig =config.config[weixinid];
    console.log(weixinconfig) ;

    var wxconfig = {
        token: weixinconfig.token,
        appid: weixinconfig.appid,
        encodingAESKey: weixinconfig.encodingAESKey
    };

    var wx = wechat(wxconfig, function (req, res, next) {
        // 主逻辑
        var retlog = {};
        var message = req.weixin;
        var wen = {};
        wen.wen = message.Content;
        var EventKey;
        var Content;
        if (message.EventKey) {
            EventKey = message.EventKey;
        }
        else {
            EventKey = message.Event;
        }

        if (EventKey != 'LOCATION') {
            Content = message.Content;
        }
        var MsgType = message.MsgType;
        var Content = message.Content;
        var FromUserName = message.FromUserName;
        var ToUserName = message.ToUserName;
        retlog.MsgType = MsgType;
        retlog.Content = Content;
        retlog.FromUserName = FromUserName;
        retlog.ToUserName = ToUserName;
        retlog.EventKey = EventKey;



        if (message.MsgType == 'text') {

            if (Content == '测试') {
                var weixinid = 'wx_' + id;
                var weixinsubscribe = config[weixinid];


                console.log(weixinsubscribe.text, Content, FromUserName);
                res.reply({
                    content: weixinsubscribe.text + Content + FromUserName,
                    type: 'text'
                });
            }
            else if (Content == '微信') {
                res.reply({
                    content: config.Domain + 'getauthorizeurl/' + id + '/',
                    type: 'text'
                });
            }
            else {

                res.transfer2CustomerService();
            }


        }
        else if (message.Event == 'subscribe') {  // 第一次关注微信回复

            var weixinid = 'wx_' + id;

            var weixinsubscribe = config[weixinid];

            var mes = {
                FromUserName: FromUserName,
                MsgType: 'event',
                Event: 'subscribe',
                weixinmp: id
            };

            //wxmessage.push(mes); //进入分发消息队列
            res.reply({
                content: weixinsubscribe.text,
                type: 'text'
            });
        }
        else if (message.Event == 'SCAN') {  // 二维码扫码事件

            var ret = FromUserName + "  二维码信息" + EventKey + "  " + message.Ticket;
            console.log("扫描二维码信息", ret);
            //查询二维码信息
            //qrcodes.findticket(message.Ticket, id, function (e, v) {
            //        if (!e) {
            //            var mes = {
            //                FromUserName: FromUserName,
            //                MsgType: 'boxbind',
            //                sc: v[0].openId,
            //                weixinmp: id
            //            };
            //            //立即分发消息
            //            dispatchMsg.timelydispatchMsg(mes, function (e, v) {
            //                    console.log("扫码立即分发消息", e, v);
            //                }
            //            );
            //
            //            res.transfer2CustomerService();
            //
            //        }
            //        else {
            //            res.transfer2CustomerService();
            //        }
            //    }
            //)
        }
        else if (message.Event == 'LOCATION') {  //坐标

            var ret = "坐标" + message.Latitude + "  " + message.Longitude + "   " + message.Precision;
            var myDate = new Date();

            var  weizhi={} ;
            weizhi.Latitude= message.Latitude ;
            weizhi.Longitude=message.Longitude ;
            weizhi.Precision=message.Precision ;
            weizhi.createtime=tool.formatFullDate(myDate.toLocaleString());

            res.transfer2CustomerService();


        }
        else {
            res.transfer2CustomerService();
        }

    });

    wx(req, res, next);
}


/*
 刷新微信token
 */
function wxgetAccessToken(req, res) {

    var id = req.params.id;
    var weixinid = 'wx_' + id;
    var weixinconfig = config.config[weixinid];

    var wxapi = new wxAPI(weixinconfig.appid, weixinconfig.appsecret);
    wxapi.setOpts({timeout: 150000});
    wxapi.getAccessToken(function (err, date) {
            // console.log('1');
            console.log(err, date);
            var date1 = JSON.stringify(date);
            if (!err) {
                fs.writeFile('./token/AccessToken_' + id + '.txt', date1, function (err) {
                    if (!err) {
                        res.send(date1)
                    }
                    else {
                        console.log('生成token错误',err)
                        res.send(err);
                    }
                });
            }

        }
    )
}

exports.getAccessToken = getAccessToken;
exports.checkinfo=checkinfo ;
exports.getAuthorizeURL = getAuthorizeURL;
exports.getAccessToken = getAccessToken;
exports.checkLogin=checkLogin ;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes/index');
var admin = require('./routes/admin.js');
var ueditor = require("./lib/api/ueditor");
var config = require('./config/config.js');
var qiniu = require('./lib/api/qiniu.js');
var os = require('os');
var app = express();

// view engine setup
app.use(cookieParser());

// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
   extended: true
}))
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json({ "limit":"80mb"}));

app.use(cookieParser('keyboard cat'));

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use('/manager',admin);
app.use('/', routes);


app.use("/ueditor/ue/", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求

    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/';
        var  filename=req.ueditor.filename;
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }

    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

app.use(function(req, res, next) {
    res.render('404');
});

/*

 */


var log4js = require('log4js');
log4js.configure('config/log4js.json');
global.logger = log4js.getLogger();
app.use(log4js.connectLogger(logger,
    {
        format: ':method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
        nolog: ["\\.jpg", "\\.ico", "\\.png", "\\.gif", "\\.js", "\\.css", "\\.swf"]
    }));

module.exports = app;

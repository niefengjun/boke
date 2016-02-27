var blog = require('./nedb/blog');
var tool = require('./tool');
var config = require('./config').config;
exports.index = function (req, res) {

    var AjaxType = req.param('ajax');
     console.log(AjaxType);
    switch (AjaxType) {
        case "add":
            blogadd(req, res);
            break;
        case "newsedit":
            newsedit(req, res);
            break;
        case "blogDel":
            blogDel(req, res);
            break;
        case "blogedit":
            blogedit(req, res);
            break;
        case "bloginfo":
            bloginfo(req, res);
            break;
        case "pagePageInfo":
            pagePageInfo(req, res);
            break;
        case "edit":
            var id = req.query.id;
            res.render("admin/blogedit", {id: id});
            break;
        case "list":
            res.render("admin/bloglist");
            break;
        default :
            res.render("admin/blogIndex");
            break;
    }
};


function blogedit(req, res) {
    var id = req.param('id');



    var content = unescape(req.param('c'));
    var t = unescape(req.param('t'));
    var column=req.param('column') ;
    var  texttime=req.param('texttime') ;

    var myDate = new Date();
    var time1 = tool.formatFullDate(myDate);

    var classname = '';
    classname = classname + '<ul class="nav pull-right navbar-nav">';
    classname = classname + '<li><a href="/">首页</a></li>';
    var xuanzhong = config.menu;
    for (var i = 0; i < xuanzhong.length; i++) {
        if (xuanzhong[i].m == column) {
            classname = classname + '<li class="active"><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
        }
        else {
            classname = classname + '<li><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
        }
    }
    classname = classname + '</ul>';



    blog.info(id, function (k, v) {

            var info = v;
            info.title = t;
            info.column=column ;

            info.content = content;

            info.updated = time1;
            info.created=texttime ;
            info.update_username = tool.cookuserinfo(req).username;
            info.classname = classname;

            blog.blogedit(id, info, function (k, v) {
                    tool.write_html('blogindex.html', info, "/blog/" + info._id + ".html", function (e, v) {
                            console.log('生成新闻', e, v);
                        }
                    )
                    res.send(v);
                }
            );
        }
    );
    // var info ={title:''+title+'',content:''+content+'',created:''+time+'',create_username:''+req.cookies["wifiadminuser"].toString() +'',updated:'',update_username:'',type:''};

}
function bloginfo(req, res) {
    var id = req.query.id;
    console.log(id);
    blog.info(id, function (k, v) {
            res.send(v);
        }
    );
}
function blogDel(req, res) {
    var id = req.query.id;


    blog.blogDel(id, function (k, v) {
            res.send('1');
        }
    );
}
function pagePageInfo(req, res) {
    var cSize = req.query.pageSize;
    var cPage = req.query.currentPage;

    blog.list(function (err, list) {

        list.sort(tool.sortJSONArry('created', true, Date.parse));
        var ret = {
            pageInfo: tool.getPageInfo(list.length, cSize),
            pageData: tool.getPageData(list, cSize, cPage)
        }

        res.send(ret);
    })
}

//博客添加
function blogadd(req, res) {
    var title = (unescape(req.param('t')));
    var content = (unescape(req.param('c')));
    //var myDate=req.query.texttime;
    var  myDate=req.param('texttime') ;
    var time = tool.formatFullDate(myDate);
    var column=req.param('column') ;
    var info = {
        _id: tool.generateUUID(32),
        title: title,
        content: content,
        column:column,
        yuedu: 0,
        created: time,
        create_username: tool.cookuserinfo(req).username
    };

    var classname = '';
    classname = classname + '<ul class="nav pull-right navbar-nav">';
    classname = classname + '<li><a href="/">首页</a></li>';
    var xuanzhong = config.menu;
    for (var i = 0; i < xuanzhong.length; i++) {
        if (xuanzhong[i].m == info.column) {
            classname = classname + '<li class="active"><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
        }
        else {
            classname = classname + '<li><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
        }
    }
    classname = classname + '</ul>';

    info.classname = classname;

    blog.add(info, function (k, v) {
            if (!k) {
                tool.write_html('blogindex.html', info, "/blog/" + info._id + ".html", function (e, v) {
                        console.log('生成新闻', e, v);
                    }
                )
                res.send('1');
            }
            else {
                res.send('0')
            }
        }
    );
}
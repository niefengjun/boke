var blog = require('./nedb/blog');
var tool = require('./tool');
var config = require('./config').config;
exports.index = function (req, res) {
    console.log('ht',req.session,req.sessionID);
    var AjaxType = req.param('ajax');
    console.log(AjaxType) ;
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
            res.render("newadmin/bloglist");
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


    return blog.info(id).then(function (data) {
        var info = data;
        info.title = t;
        info.column = column;
        info.content = content;
        info.updated = time1;
        info.created = texttime;
        info.update_username = tool.cookuserinfo(req).username;

        info.uuid = info._id;
        console.log(info);
        return blog.blogedit(info).then(function (data) {
            info.classname = classname;
                tool.write_html('blogindex.html', info, "/blog/" + info._id + ".html", function (e, v) {
                            console.log('生成新闻', e, v);
                        res.send('修改成功');
                        }
                    )

            }, function (err) {
                return res.send(err);
            }
        )
        }
    )

}
function bloginfo(req, res) {
    var id = req.query.id;
    return blog.info(id).then(function (data) {
        return res.send(data);
        }
    );
}
function blogDel(req, res) {
    var id = req.query.id;
    var args = {};
    args.uuid = id;
    return blog.blogDel(args).then(function (data) {
            res.send('1');
        }, function (err) {
            console.error(err)
            res.send(err);
        }
    )
}
function pagePageInfo(req, res) {
    //var cSize = req.query.pageSize;
    //var cPage = req.query.currentPage;
    var sEcho=req.query.sEcho ;
    var sSource=req.query.sSource ;
    var cSize= req.query.iDisplayLength;
    var cPage = req.query.iDisplayStart;
    console.log(cSize, cPage) ;

    return blog.list().then(function (data) {
            //console.log(data);
            data.sort(tool.sortJSONArry('created', true, Date.parse));

        //var ret = {
        //   // pageInfo: tool.getPageInfo(data.length, cSize),
        //    aaData:data,
        //    iTotalRecords:data.length,
        //    iTotalDisplayRecords:data.length ,
        //    sEcho:sEcho
        //}

        var ret = {
           // aaData: tool.getPageInfo(data, cSize).recordCount,
            aaData: tool.getPageData(data, cSize, cPage),
            iTotalRecords:data.length,
            iTotalDisplayRecords:data.length,
            sEcho:sEcho
        }
        //var ret=data ;

            res.send(ret);
        }, function (err) {
            res.send(err);
        }
    )
}

//博客添加
function blogadd(req, res) {
    var title = (unescape(req.param('t')));
    var content = (unescape(req.param('c')));
    //var myDate=req.query.texttime;

    var  myDate=req.param('texttime') ;
    if(!myDate)
    {
        myDate=new Date() ;
    }
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

   // info.classname = classname;

    return blog.add(info).then(function (data) {
            info.classname = classname;
            tool.write_html('blogindex.html', info, "/blog/" + info._id + ".html", function (e, v) {
                   // console.log('生成新闻', e, v);
                    res.send('1') ;
                }
            )

        }, function (err) {
            res.send('0');
        }
    )
}
/*
 * GET home page.
 */
var blog = require('./nedb/blog');

var config = require("./config.js").config;
var tool = require('./tool');

exports.index = function (req, res) {
    var listli = '';
    var b = {};
    b.title = config.title;
    b.description = config.description;

    var xuanzhong = config.menu;
    var classname='' ;

    var cSize = req.query.pageSize;

    if (!cSize) {
        cSize = 10;
    }

    var page = parseInt(req.params.page) || 1;

    classname = classname + '<ul class="nav pull-right navbar-nav">';
    classname = classname + '<li class="active" ><a href="/">首页</a></li>';
    for (var i = 0; i < xuanzhong.length; i++) {


        classname = classname + '<li><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';

    }
    classname = classname + '</ul>';

    return blog.newlist().then(function(v)
    {
                listli = listli + '<ul class="grove-list">';
                for (var i = 0; i < v.length; i++) {
                    listli = listli + '<li><h5 class=\"media-heading\">';
                    listli = listli + '<a href="/blog/' + v[i]._id + '.html">';
                    listli = listli + '' + v[i].title + '';
                    listli = listli + '</a>';
                    listli = listli + '</li>';
                    if (i == 10) {
                        break;
                    }
                }
                listli = listli + '</ul">';
                var toplist = [];

                return blog.list().then(function(data)
                {
                                if (data) {
                                    for (var i = 0; i < data.length; i++) {
                                        var top = data[i];
                                        if(data[i].content) {
                                            top.content = tool.delHtmlTag(data[i].content);
                                        }
                                        toplist.push(top);
                                    }
                                }
                                data.sort(tool.sortJSONArry('created', true, Date.parse));

                                var ret = {
                                    page: page,
                                    perPage: cSize,
                                    total: data.length,
                                    items: tool.getPageData(toplist, cSize, page),
                                    pages: tool.getPageInfo(data.length, cSize).pageCount

                                }
                                res.render('index', {blog: b, title:config.title,listli: listli, classname: classname, paginate: ret});
                },function(err)
                {
                  //  console.log(err) ;
                }
                )
    }
    )

};



function findOneid_yuedu(req, res) {

    var id = req.params.id;

    blog.findOneid_yuedu(id).then(function (v) {
            res.json('q');
        }
    );
}

exports.findOneid_yuedu=findOneid_yuedu ;


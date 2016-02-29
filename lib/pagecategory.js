var blog = require('./nedb/blog');
var tool = require('./tool');

var config = require("./config.js").config;
exports.index = function (req, res) {

    var AjaxType = req.param('ajax');
    var category = req.params.id;
    var classname = '';
    var xuanzhong = config.menu;
    classname = classname + '<ul class="nav pull-right navbar-nav">';
    classname = classname + '<li><a href="/">首页</a></li>';
    for (var i = 0; i < xuanzhong.length; i++) {
        if (xuanzhong[i].m == category) {
            classname = classname + '<li class="active"><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
        }
        else {
            classname = classname + '<li><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
        }
    }
    classname = classname + '</ul>';

    var cSize = req.query.pageSize;

    if (!cSize) {
        cSize = 5;
    }

    var page = parseInt(req.params.page) || 1;


    switch (AjaxType) {

        case "pagePageInfo":
            pagePageInfo(req, res);
            break;
        default :

            var toplist = [];

            blog.categorylist(category).then(function (list) {

                    if (list) {
                        for (var i = 0; i < list.length; i++) {
                            var top = list[i];
                            top.content = tool.delHtmlTag(list[i].content);
                            toplist.push(top);
                        }
                    }
                    list.sort(tool.sortJSONArry('created', true, Date.parse));
                    var ret = {
                        page: page,
                        perPage: cSize,
                        total: list.length,
                        items: tool.getPageData(toplist, cSize, page),
                        pages: tool.getPageInfo(list.length, cSize).pageCount

                    }
                    res.render("category", {category: category, classname: classname, paginate: ret});
                }
            )

            break;
    }
};
function pagePageInfo(req, res) {
    var cSize = req.query.pageSize;
    var cPage = req.query.currentPage;
    var category = req.params.id;
    blog.categorylist(category).then (function(list) {
        list.sort(tool.sortJSONArry('created', true, Date.parse));
        var ret = {
            pageInfo: tool.getPageInfo(list.length, cSize),
            pageData: tool.getPageData(list, cSize, cPage)
        }

        res.send(ret);
    })
}
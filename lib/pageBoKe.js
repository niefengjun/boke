var blog = require('./nedb/blog');
var tool = require('./tool');
var config = require("./config.js").config;
exports.index = function (req, res) {

    var AjaxType = req.param('ajax');
    // console.log(AjaxType);
    switch (AjaxType) {
        case "add":
            blogadd(req, res);
            break;
        case "newsedit":
            newsedit(req, res);
            break;
        case "pagePageInfo":
            pagePageInfo(req, res);
            break;
        default :
            blog.list(function (e, v) {
                    // console.log(v) ;


                    res.send(v);
                }
            )

            break;
    }
};

function pagePageInfo(req, res) {
    var cSize = req.query.pageSize;
    var cPage = req.query.currentPage;

    blog.list(function (err, list) {

        // list.sort(tool.sortJSONArry('created', true, Date.parse));
        var ret = {
            pageInfo: tool.getPageInfo(list.length, cSize),
            pageData: tool.getPageData(list, cSize, cPage)
        }

        res.send(ret);
    })
}

function blog1(req, res) {

    var xuanzhong = config.menu;

    var id = req.params.id;
    var classname='' ;
    // console.log(id);
    blog.findOneid(id, function (e, v) {

            classname = classname + '<ul class="nav pull-right navbar-nav">';
            classname = classname + '<li><a href="/">首页</a></li>';
            for (var i = 0; i < xuanzhong.length; i++) {
                if ( v.column&&xuanzhong[i].m == v.column) {
                    classname = classname + '<li class="active"><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
                }
                else {
                    classname = classname + '<li><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
                }
            }
            classname = classname + '</ul>';
            v.classname=classname ;
            // console.log(e, v);

            res.render("blogindex", v);
        }
    );
}


function findOneid_yuedu(req, res) {

    var id = req.params.id;

    blog.findOneid_yuedu(id, function (e, v) {
            var ret={} ;
            ret.id=id ;
            res.send(ret);
        }
    );
}
exports.blog1 = blog1;
exports.findOneid_yuedu=findOneid_yuedu ;
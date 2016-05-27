/*
 * GET home page.
 */
var blog = require('./nedb/blog');

var config = require("./config.js").config;
var tool = require('./tool');
var blogword = require('./nedb/blogword.js');

exports.index = function (req, res) {
    var listli = '';
    var b = {};
    b.title = config.title;
    b.description = config.description;

    var xuanzhong = config.menu;
    var classname = '';

    var cSize = req.query.pageSize;
    var word = req.query.word;
    console.log(req.session, req.sessionID);

    if (!cSize) {
        cSize = 100;
    }

    var page = parseInt(req.params.page) || 1;

    classname = classname + '<ul class="nav pull-right navbar-nav">';
    classname = classname + '<li class="active" ><a href="/">首页</a></li>';
    for (var i = 0; i < xuanzhong.length; i++) {

        classname = classname + '<li><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
    }
    classname = classname + '</ul>';

    var myDate = new Date();
    var time1 = tool.formatFullDate(myDate);

    blog.newlist().then(function (v) {

        listli = listli + '<ul class="grove-list">';
        for (var i = 0; i < v.length; i++) {
            // log.warn('11111','<a href="/blog/' + v[i]._id + '.html">') ;
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

        if (word) {
            console.log(word);
            return blog.seach(word);
        } else {
            return false;
            //  return res.render('search', {blog: b, listli: listli, classname: classname, paginate:''});
        }
    }).then(function (list) {
        var toplist = [];
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var top = list[i];
                if (list[i].content) {
                    top.content = tool.delHtmlTag(list[i].content);
                }
                toplist.push(top);
            }
            list.sort(tool.sortJSONArry('created', true, Date.parse));
        }

        var ret = {
            page: page,
            perPage: cSize,
            total: list.length,
            items: tool.getPageData(toplist, cSize, page),
            pages: tool.getPageInfo(list.length, cSize).pageCount

        };

        //  res.send(ret);
        if (ret) {
            res.render('search', { blog: b, listli: listli, classname: classname, paginate: ret });
        } else {
            res.render('search', { blog: b, listli: listli, classname: classname, paginate: '' });
        }
        var args = {};
        args.key = word;
        args.create = time1;

        return blogword.seachkey(args);
    }, function (err) {
        console.log(err);
    }).catch(function (err) {
        console.log(err);
    });
};

//# sourceMappingURL=pageSeach-compiled.js.map
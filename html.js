var fs=require('fs') ;

var ejs=require('ejs') ;
var blog = require('./lib/nedb/blog');
var config = require('./lib/config').config;

//function html(mpath,file,baoqian,shuju) {
fs.readFile('./views/blogindex.html', function (e, v) {
        console.log(e,v) ;
        var mb= v.toString() ;
        var classname='' ;
        classname = classname + '<ul class="nav pull-right navbar-nav">';
        classname = classname + '<li><a href="/">首页</a></li>';
        var xuanzhong = config.menu;
        for (var i = 0; i < xuanzhong.length; i++) {
            if ( v[i].column&&xuanzhong[i].m == v.column) {
                classname = classname + '<li class="active"><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
            }
            else {
                classname = classname + '<li><a href="' + xuanzhong[i].url + '">' + xuanzhong[i].name + '</a></li>';
            }
        }
        classname = classname + '</ul>';



        blog.list().then(function(v)

            {


                for (var i = 0; i < v.length; i++) {

                    var options =v[i] ;
                    // options.title='聂峰军个人网站';
                    options.classname=classname ;

                    var template = ejs.render(mb, options);
                    fs.writeFile('./public/blog/'+ v[i]._id +'.html', template, function (err) {
                        if (err) throw err;
                        //console.log("Export Account Success!");
                    });
                    //list = list + '<item>';
                    //list = list + '<author>' + v[i].title + '</author>';
                    //list = list + '<title><![CDATA[' + (v[i].title) + ']]></title>';
                    //list = list + '<link>http://niefengjun.cn/blog/' + v[i]._id + '.html</link>';
                    //list = list + '<description><![CDATA[' + delHtmlTag(v[i].content) + ']]></description>';
                    //list = list + '<pubDate>' + v[i].created + '</pubDate>';
                    //list = list + '</item>';
                }
            }
        );








    }

)
//}
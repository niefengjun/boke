var login1 = require('./nedb/admin');
var tool = require('./tool');
function index(req, res) {
    res.render('admin/login', {title: 'Express'});
}

function login(req, res) {
    var username = req.query.u;
    var password = req.query.p;
    var args = {};
    args.username = username;
    login1.login(args).then(function (data) {
            console.log('', data);
            if (data && data.password == password) {
                console.log('1');
                var useinfo = tool.encrypt(JSON.stringify(data));
                console.log(useinfo);
                res.cookie("wifiadminuser", useinfo, {maxAge: 86400000});
                res.send('1');
            }
            else {
                res.send('0');
            }
        }
        ,
        function (err) {
            console.error(err);
            res.send('0');
        }
    )

}

exports.checkLogin = function (req, res, next) {
    var url = req.originalUrl;

    if (!(url.indexOf('/style') > -1 || url.indexOf('/mp') > -1 || url.indexOf('/css') > -1 || url.indexOf('/images') > -1 || url.indexOf('/js') > -1 || url.indexOf('/ueditor') > -1)) {
        console.log(url);
        if (req.cookies["wifiadminuser"]) {

            next();

        } else {
            res.redirect("/");
        }


    } else {

        next();
    }
}
exports.index = index;
exports.login = login;
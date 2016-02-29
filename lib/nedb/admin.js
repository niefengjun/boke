var db = require('./db').getnedb('admin');
var Q=require('q') ;

function login(args) {
    var defer = Q.defer();
    db.findOne(args, function (e, v) {
            console.log(e, v);
            if (e) {
                defer.reject(err);
            }
            else {
                defer.resolve(v);
            }
        }
    );
    return defer.promise ;
}

function addadmin(ret, callback) {


    db.insert(ret, function (e, v) {
            callback(e, v);
        }
    );
}

//function updateadmin(ret,callback)
//{
//    db.update({_id:})
//}

exports.login = login;
exports.addadmin = addadmin;


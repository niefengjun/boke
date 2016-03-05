var db = require('./db').getnedb('blogword');
var Q = require('q');


function seachkey(args) {
    var defer = Q.defer();
    db.findOne({key:args.key}, function (key, v) {

        if(!!v) {
            if (v.chaxun) {
                v.chaxun = v.chaxun + 1;
            }
            else {
                v.chaxun = 1;
            }

            db.update({key: args.key}, v, function (e, list) {

                if (e) {
                    defer.reject(e);
                }
                else {
                    defer.resolve(list)
                }
            })
        }
        else
        {
            db.insert(args, function (e, v) {
                    if (e) {
                        console.error(e, v);
                        defer.reject(e)
                    }
                    else {
                        defer.resolve(v);
                    }
                }
            );
        }
    });

    return defer.promise ;
}

exports.seachkey=seachkey ;
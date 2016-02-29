var db = require('./db').getnedb('blog');
var Q = require('q');
function add(ret) {
    var defer = Q.defer();
    db.insert(ret, function (e, v) {
        if (e) {
            console.error(e, v);
            defer.reject(e)
        }
        else {
            defer.resolve(v);
        }
        }
    );
    return defer.promise;
}


function list() {
    var defer= Q.defer() ;
    db.find({}).sort({created: -1}).skip().exec(function (err, list) {
       if(err)
       {
           defer.reject(err);
       }
        else
       {
           defer.resolve(list)
       }
    });

    return defer.promise ;
}


function seach(word) {

    var reg = new RegExp(word, 'i');
    var defer= Q.defer() ;
    db.find({title: {$regex: reg}}, function (err, docs) {
       // console.log(err,docs) ;
        if(err)
        {
            defer.reject(err) ;
        }
        else
        {
            defer.resolve(docs)
        }
    });
    return defer.promise ;

}

function categorylist(category1, callback) {

    var defer= Q.defer() ;
    db.find({column: category1}).sort({created: -1}).skip().exec(function (err, list) {
        if(err)
        {
            defer.reject(err) ;
        }
        else
        {
            defer.resolve(list)
        }
    });
    return defer.promise ;
}


function hotlist() {

    var defer = Q.defer();
    db.find({}).sort({yuedu: -1}).skip().exec(function (key, list) {
        if (err) {
            defer.reject(e);
        }
        else {
            defer.resolve(list)
        }
    });
    return defer.promise;
}


function newlist() {

    var defer = Q.defer();
    db.find({}).sort({created: -1}).skip().exec(function (err, list) {
        // docs is [doc3, doc1]
       // console.log(err,list) ;
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(list);
        }
    });
    return defer.promise;
}

function blogDel(args) {

    var defer = Q.defer();
    db.remove({_id: args.uuid}, function (err, value) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(value)
        }
        }
    );
    return defer.promise;
}


function info(id) {

    var defer = Q.defer();
    db.findOne({_id: id}, function (err, value) {
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(value)
        }
        }
    );
    return defer.promise;
}

function blogedit(args) {

    var defer = Q.defer();
    console.log(defer) ;
    db.update({_id: args.uuid},args, function (err, value) {
        console.log(err,value) ;
        if (err) {
            defer.reject(err);
        }
        else {
            defer.resolve(value) ;
        }
    });

    return defer.promise;

}
function findOneid(id1, callback) {

    var defer = Q.defer();
    db.findOne({_id: id1}, function (key, v) {

        if (v.yuedu) {
            v.yuedu = v.yuedu + 1;
        }
        else {
            v.yuedu = 1;
        }

        db.update({_id: id1}, v, function (e, v1) {
            if (err) {
                defer.reject(e);
            }
            else {
                defer.resolve(list)
            }
        })
    });

    return defer.promise;


}


function findOneid_yuedu(id1, callback) {

    var defer = Q.defer();
    db.findOne({_id: id1}, function (key, v) {

        if (v.yuedu) {
            v.yuedu = v.yuedu + 1;
        }
        else {
            v.yuedu = 1;
        }

        db.update({_id: id1}, v, function (e, list) {

            if (e) {
                defer.reject(e);
            }
            else {
                defer.resolve(list)
            }
        })
    });

    return defer.promise;

}


exports.add = add;
exports.list = list;
exports.findOneid = findOneid;
exports.blogDel = blogDel;
exports.info = info;
exports.blogedit = blogedit;
exports.hotlist = hotlist;
exports.categorylist = categorylist;
exports.findOneid_yuedu = findOneid_yuedu;
exports.newlist = newlist;
exports.seach = seach;
//exports.updateshuju=updateshuju ;
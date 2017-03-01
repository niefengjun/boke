/**
 * Created by tom on 2017/2/18.
 */
var db = require('./db').getnedb('classify');
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
function getInfo(word) {

    var reg = new RegExp(word, 'i');
    var defer= Q.defer() ;
    db.find({title:reg}, function (err, docs) {
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






exports.add = add;
exports.list = list;

exports.blogDel = blogDel;
exports.info = info;

exports.seach = seach;
exports.getInfo=getInfo ;
//exports.updateshuju=updateshuju ;
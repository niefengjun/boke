var db = require('./db').getnedb('blog');
function add(ret, callback) {
    db.insert(ret, function (e, v) {
            callback(e, v);
        }
    );
}


function list(callback) {
    //db.find().sort({created:-1}).toArray(function (key, list) {
    //
    //    callback(key, list);
    //});

    db.find({}).sort({created: -1}).skip().exec(function (key, list) {
        // docs is [doc3, doc1]
        callback(key, list);
    });
}


function seach(word, callback) {

    var reg = new RegExp(word, 'i');

    db.find({title: {$regex: reg}, content: {$regex: reg}}, function (err, docs) {
        callback(err, docs);
    });

}

function categorylist(category1, callback) {


    db.find({column: category1}).sort({created: -1}).skip().exec(function (key, list) {
        // docs is [doc3, doc1]
        callback(key, list);
    });
}


function hotlist(callback) {


    db.find({}).sort({yuedu: -1}).skip().exec(function (key, list) {
        // docs is [doc3, doc1]
        callback(key, list);
    });
}


function newlist(callback) {


    db.find({}).sort({created: -1}).skip().exec(function (key, list) {
        // docs is [doc3, doc1]
        callback(key, list);
    });
}

function blogDel(uuid, callback) {

    db.remove({_id: uuid}, function (key, value) {

            callback(key, value);
        }
    );

}


function info(id, callback) {

    db.findOne({_id: id}, function (key, value) {

            callback(key, value);
        }
    );

}

function blogedit(uuid, info, callback) {


    db.update({_id: uuid}, info, function (key, value) {
        callback(null, '修改成功');
    });

}
function findOneid(id1, callback) {

    db.findOne({_id: id1}, function (key, v) {

        if (v.yuedu) {
            v.yuedu = v.yuedu + 1;
        }
        else {
            v.yuedu = 1;
        }

        db.update({_id: id1}, v, function (e, v1) {

            callback(key, v);
        })
    });


}


function findOneid_yuedu(id1, callback) {

    db.findOne({_id: id1}, function (key, v) {

        if (v.yuedu) {
            v.yuedu = v.yuedu + 1;
        }
        else {
            v.yuedu = 1;
        }

        db.update({_id: id1}, v, function (e, v1) {

            callback(key, v);
        })
    });


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
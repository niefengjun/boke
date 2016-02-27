var db = require('./db').getnedb('blogword');
function add(ret, callback) {
    db.insert(ret, function (e, v) {
            callback(e, v);
        }
    );
}

express.add=add ;
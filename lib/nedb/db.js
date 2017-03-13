var Datastore = require('nedb');


exports.getnedb = function (collectionName) {

    return db1 = new Datastore({filename: './db/niefengjun/' + collectionName, autoload: true});
}
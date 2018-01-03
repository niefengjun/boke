/**
 * Created by tom on 2017/11/29.
 */
var http = require('http');

var Server = require('mongodb').Server;
var mongodb = require('mongodb');
var Db = require('mongodb').Db;
var db_name =
    'newugc';                 // 数据库名，从云平台获取
var db_host = "172.28.6.150";     // 数据库地址
var db_port = "27017";  //
var username =
    "laonie";                // 用户名
var password =
    "laonie";                // 密码
var db = new Db(db_name, new Server(db_host, db_port, {}), {w:
    1});

        db.open(function(err, db) {
            db.authenticate(username, password, function(err, result) {
                if (err) {
                    db.close();

                    return;
                }
                var collection = new
                mongodb.Collection(db,'images');//表：user
                collection.find({"end":{$gt:new Date()}},function(error,cursor){
                        console.log(error);
                        cursor.each(function(error,doc){
                            if(doc){
                                console.log(doc);
                            }
                        });

                    }
                );
            });
        });


console.log('Server running at http://127.0.0.1:3000/');
var a={"ret":{"pageSize":"2","totalRecords":"asdasdasd"}};

var request=require('request') ;
function test(i,callback) {


  //  console.log(body.data.ticket) ;
  //  var requestData = {"ticket":'fae76a2ada35d1a8b061406ad2a356c6', "content": '222222ss_'+i}
    // request({
    //     url: "http://172.28.50.128:8081/bullet/barrage/addBarrage",
    //     method: "POST",
    //     json: true,
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: requestData
    // }, function (error, response, body) {
    //     console.log('完成===='+i, error, body)
    //     callback(body)
    // });

    var request=require('request') ;
    request({
        url: "http://172.28.50.128:8081/checkin/login/loginbyfeed",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            "mettingId": 1,
            "feedId": "s_7149889095826896"
        }
    }, function (error, response, body) {

           console.log(body.data.ticket) ;
            var requestData = {"ticket":'fae76a2ada35d1a8b061406ad2a356c6', "content": body.data.ticket+'_'+i}
            request({
                url: "http://172.28.50.128:8081/bullet/barrage/addBarrage",
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: requestData
            }, function (error, response, body) {
                console.log('完成====', error, body)
                callback(body)
            });

    });
}


//
//  for (var i=0;i<100000;i++)
//  {
//      // (function (i) {
//      //     console.log(i) ;
//          test(i,function (data) {
//              console.log(data)
//          })
//
//      // })(i)
// }

// var requestData={"ticket":"09dc457c526ca996a603f7dafe794a52", "content":"asdfasdfasdf"};
// request({
//     url:"http://172.28.50.128:8081/bullet/barrage/addBarrage",
//     method: "POST",
//     json: true,
//     headers: {
//         "content-type": "application/json",
//     },
//     body: requestData
// }, function(error, response, body) {
//     console.log(error,body)
// });

// for  (var  i = 0 ; i <3000; i++) {
//     ( function (i) {
//
//         test(i,function (data) {
//             console.log(data)
//         })
//         // fs.readFile(files[i], 'utf-8', function (err, contents) {
//         //     console.log('匿名函数',files[i],': ' , contents);
//         // });
//     })(i);
// }

//
// var redis = require("redis"),
//     client = redis.createClient(6379,"172.28.50.175");
// client.auth('123456',function(){
//     console.log('通过认证');
// });
// client.on('connect',function(){
//     client.set('author', 'Wilson');
//
//     console.log('connect');
// });
// client.on('ready',function(err){
//      console.log('ready',err);
// });

var a=JSON.stringify({"ticket":"fae76a2ada35d1a8b061406ad2a356c6", "content": "222222s"})

console.log(a) ;
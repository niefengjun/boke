var blogword=require('./lib/nedb/blogword')
blogword.list().then(function(data)
    {
        console.log(data) ;
    }
)
client.getUser('openid', function (err, result) {
    var userInfo = result;
});
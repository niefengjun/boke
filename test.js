var blogword=require('./lib/nedb/blogword')
blogword.list().then(function(data)
    {
        console.log(data) ;
    }
)
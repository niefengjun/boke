var admin = require('./lib/nedb/admin.js');
var ret={};
ret.id='1234567890'
ret.username="admin" ;
ret.password="e10adc3949ba59abbe56e057f20f883e" ;
admin.addadmin(ret,function(e,v)
    {
        console.log(e,v) ;
    }
)
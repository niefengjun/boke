var qiniu = require("qiniu");
var tool = require("../tool");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'OZeMdO5JIR0PUdY52sLkErG0gDoLgFLfae0rP_1_';
qiniu.conf.SECRET_KEY = '5cfcj7U9wLxbPOhWto4rr4UuHkmhUmnX88puvV0F';

//要上传的空间
bucket = 'niefengjun';

function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}

//构造上传函数
function uploadFile (localFile,jpg,callback) {
    var key=tool.generateUUID(32)+'.'+jpg;
    var token = uptoken(bucket, key);
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, localFile, extra, function(err, ret) {
        console.log(err, ret);
        if(!err) {
            // 上传成功， 处理返回值
            callback(null,ret) ;
            console.log(ret);
        } else {
            // 上传失败， 处理返回代码
            callback(err,ret) ;
        }
    });
}



exports.uploadFile=uploadFile ;




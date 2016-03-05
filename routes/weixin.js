var express = require('express');
var router = express.Router();
var pageWexin=require('../lib/pageWeixin.js') ;
/* GET home page. */
router.get('/:id/',pageWexin.index) ;

router.all('/getauthorizeurl/:id/', pageWexin.getAuthorizeURL); //生成微信访问连接
router.all('/getaccesstoken/:id/', pageWexin.getAccessToken); //根据code 换取用户信息

module.exports = router;
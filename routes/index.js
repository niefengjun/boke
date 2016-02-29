var express = require('express');
var router = express.Router();
var pageLogin = require('../lib/pageLogin.js');
var pageBlog = require('../lib/pageBlog.js');
var pageIndex = require('../lib/pageIndex.js');
var pagecategory = require('../lib/pagecategory.js');
/* GET home page. */

router.get('/',pageIndex.index) ;
//router.get('/search',pageSeach.index) ;
// app.get('/sogousiteverification.txt',pageblogindex.baidu) ;
router.get('/page_:page.html', pageIndex.index);
router.get('/category/:id.html', pagecategory.index);
router.get('/category/:id/:page.html', pagecategory.index);

router.get('/admin', pageLogin.index);
router.get('/Login/', pageLogin.login);
router.all('*', pageLogin.checkLogin);
router.all('/admin/blog/',pageBlog.index) ;

module.exports = router;

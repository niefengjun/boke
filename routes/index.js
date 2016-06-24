
var express = require('express');
var router = express.Router();
var pageLogin = require('../lib/pageLogin.js');
var pageBlog = require('../lib/pageBlog.js');
var pageIndex = require('../lib/pageIndex.js');
var pagecategory = require('../lib/pagecategory.js');
var pageSeach = require('../lib/pageSeach.js');
/* GET home page. */
router.get('/',pageIndex.index) ;
router.get('/search',pageSeach.index) ;
router.get('/blogyuedu/:id/',pageIndex.findOneid_yuedu) ;
router.get('/page_:page.html', pageIndex.index);
router.get('/category/:id.html', pagecategory.index);
router.get('/category/:id/:page.html', pagecategory.index);
router.get('/admin', pageLogin.index);
router.get('/Login/', pageLogin.login);
router.all('*', pageLogin.checkLogin);
router.all('/admin/index/',pageLogin.Loginindex)
router.all('/admin/blog/',pageBlog.index) ;
module.exports = router;

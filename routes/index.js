var express = require('express');
var router = express.Router();
var pageLogin = require('../lib/pageLogin.js');
var pageBlog = require('../lib/pageBlog.js');
/* GET home page. */
router.get('/', pageLogin.index);
router.get('/admin', pageLogin.index);
router.get('/Login/', pageLogin.login);
router.get('/admin/blog/',pageBlog.index) ;

module.exports = router;

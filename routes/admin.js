var express = require('express');
var router = express.Router();
var pageLogin = require('../lib/pageLogin.js');
var pageBlog = require('../lib/pageBlog.js');
var pageIndex = require('../lib/pageIndex.js');
var pagecategory = require('../lib/pagecategory.js');
var pageSeach = require('../lib/pageSeach.js');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('') ;
});

router.get('/index', function (req, res) {
    res.render('manager/index') ;
});

module.exports = router;

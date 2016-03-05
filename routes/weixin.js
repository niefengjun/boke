var express = require('express');
var router = express.Router();
var pageWexin=require('../lib/pageWeixin.js') ;
/* GET home page. */
router.get('/:id/',pageWexin.index) ;

module.exports = router;
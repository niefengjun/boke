var request = require('request');
var xml = require("xml2js").parseString;
var iconv = require('iconv-lite');
var crypto = require('crypto');
var config=require('./config') ;
var fs=require('fs') ;
var ejs=require('ejs') ;
var path = require('path');

exports.tablename = function (value, username) {
    return value + username;
}


var log4js = require('log4js');

function log4jserr(data)
{
    log4js.configure({
        appenders: [
            { type: 'console' }, {
                type: 'dateFile',
                filename: 'logs/app',
                pattern: "err_yyyy-MM-dd.log",
                maxLogSize: 1024,
                alwaysIncludePattern:true,
                backups: 4,
                category: 'error'
            }
        ],
        replaceConsole: true
    });

    var log = log4js.getLogger("error");
    log.info(data) ;
}

function log4jslog(data)
{
    log4js.configure({
        appenders: [
            { type: 'console' }, {
                type: 'dateFile',
                filename: 'logs/app',
                pattern: "yyyy-MM-dd.log",
                maxLogSize: 1024,
                alwaysIncludePattern:true,
                backups: 4,
                category: 'info'
            }
        ],
        replaceConsole: true
    });

    var log = log4js.getLogger("info");
    log.info(data) ;
}


exports.sqlstring=function(string)
{
    return "'"+string+"'" ;
}


function generateUUID(length) {
    var id = '',
        length = length || 32;
    while (length--)
        id += (Math.random() * 16 | 0) % 2 ? (Math.random() * 16 | 0).toString(16) : (Math.random() * 16 | 0).toString(16).toUpperCase();
    return id.toLowerCase();
}

function parseJSON(jsonString) {
    if (!jsonString)
        return {};

    var json;
    try {
        json = JSON.parse(jsonString);
    } catch (err) {
        console.error('parseJSON ERROR: ' + jsonString, err);
        console.log(err.stack)
    }

    return json ? json : {};
}
function jsonAppendJson(json1, json2) {
    try {
        return (JSON.parse((JSON.stringify(json1) + JSON.stringify(json2)).replace("}{", ",")));
    }
    catch (err) {
        return {};
    }
}

function macToInt(mac, length) {
    return mac ? parseInt(mac.toLowerCase().replace(/-/gm, ''), 16) % Math.pow(10, length) : ('000000000000000000' + parseInt(Math.pow(10, length))).slice(-length);
}

function formatMac(macString) {
    if (typeof macString !== 'string')
        return null;
    var result = macString.toLowerCase().replace(/[^0-9a-f]/igm, '');
    return result.length === 12 ? result : null;
}

//var macSplitReg = /([\w]{2})([\w]{2})([\w]{2})([\w]{2})([\w]{2})([\w]{2})/;
var macSplitReg = /[\w]{2}/g;
function readableMac(macString) {
    if (macString && macString.length === 12) {
        return macString.toUpperCase().match(macSplitReg).join('-');
    } else return macString;
}


function getFilePath(fileID) {
    return '/file/' + fileID;
}

var crypto = require('crypto');

function getNumByChar(str, length) {
    var result = '';
    str = str.toLowerCase();
    for (var i = 0; i < length; i++) {
        if (str[i])
            result += ('000000000' + (str[i].charCodeAt() - 96)).slice(-2);
        else
            result += ('000000000'.slice(-2));
    }
    return result;
}

function getYYMMDD(date) {
    if (!date)
        date = new Date();

    return ('0' + date.getFullYear()).slice(-2)
        + ('0' + (date.getMonth() + 1)).slice(-2)
        + ('0' + date.getDate()).slice(-2);
}

function getYYYYMMDD(date) {
    if (!date)
        date = new Date();

    return date.getFullYear()
        + ('0' + (date.getMonth() + 1)).slice(-2)
        + ('0' + date.getDate()).slice(-2);
}

function formatDate(timestamp) {
    if (!timestamp)
        return '';

    var date = new Date(timestamp);

    return date.getFullYear() + '-'
        + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('0' + date.getDate()).slice(-2);
}

function getFixedInt(int, length) {
    return ('000000000000000' + int).slice(-length);
}

function getFixedRandomInt(length) {
    return ('000000000000000' + Math.random() * Math.pow(10, length)).slice(-length);
}

function getMd5(str) {
    var result = "";
    try {
        if (str && typeof str === "string") {
            var md5_str = crypto.createHash('md5');
            result = md5_str.update(str).digest('hex');
        }
        else
            result = "";

    } catch (err) {
        return result;
    }

    return result;
}

function distinct(arr) {
    var obj = {};
    arr.forEach(function (item) {
        obj[item] = 1
    })
    return Object.keys(obj);
}

function formatFullDate(timestamp) {
    if (!timestamp)
        return '';

    var date = new Date(timestamp);

    return date.getFullYear() + '-'
        + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
        + ('0' + date.getDate()).slice(-2) + ' '
        + ('0' + date.getHours()).slice(-2) + ':'
        + ('0' + date.getMinutes()).slice(-2) + ':'
        + ('0' + date.getSeconds()).slice(-2);
}

//函数功能：json 排序
// filed:(string)排序字段，
// reverse: (bool) 是否倒置(是，为倒序)
// primer (parse)转换类型
//示例:list.sort(tool.sortJSONArry('downloadTimes',true,parseInt));
var sortJSONArry = function (filed, reverse, primer) {
    reverse = (reverse) ? -1 : 1;

    return function (a, b) {
        a = a[filed];
        b = b[filed];

        if (typeof (primer) != "undefined") {
            a = primer(a);
            b = primer(b);
        }

        if (a < b) {
            return reverse * -1;
        }
        if (a > b) {
            return reverse * 1;
        }
    }
}

exports.stringtojson = function (v) {
    return '"' + v + '"';
}

//发邮件

function encodeURIComponentGBK(str) {
    if (str == null || typeof(str) == 'undefined' || str == '')
        return '';

    var a = str.toString().split('');

    for (var i = 0; i < a.length; i++) {
        var ai = a[i];
        if ((ai >= '0' && ai <= '9') || (ai >= 'A' && ai <= 'Z') || (ai >= 'a' && ai <= 'z') || ai === '.' || ai === '-' || ai === '_') continue;
        var b = iconv.encode(ai, 'gbk');
        var e = ['']; // 注意先放个空字符串，最保证前面有一个%
        for (var j = 0; j < b.length; j++)
            e.push(b.toString('hex', j, j + 1).toUpperCase());
        a[i] = e.join('%');
    }
    return a.join('');
}



function toUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++)
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u" + res.join("\\u");
}
function deUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}
function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

function addDays(date, days) {
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);

    return nd;
}

//将yyyy-MM-dd格式时间，软件换为支持Date.parse方法的yyyy/mm/dd格式时间
function convertDateParserString(timeString) {
    var regEx = new RegExp("\\-", "gi");
    return timeString.replace(regEx, "/");
}

//数据去重
function uniqueArray(arr){
    var res = [];
    var json = {};
    for(var i = 0; i < arr.length; i++){
        if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}

//加密

function encrypt(str) {
    var cipher = crypto.createCipher('aes192', config.config.secret);
    var enc = cipher.update(str,'utf8','hex');
    enc += cipher.final('hex');
    return enc;
}
exports.encrypt=encrypt ;
//解密

function decrypt(str) {
    var decipher = crypto.createDecipher('aes192',config.config.secret);
    var dec = decipher.update(str,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}
exports.decrypt=decrypt ;

function recursionArea(list)
{
    var provice=[];
    var resultList=[];
    for (var i = 0; i < list.length; i++) {
        if(list[i].superior=='-1')
            provice.push({id:list[i]._id,provice:list[i].name});
    };

    for (var j = 0; j < provice.length; j++) {
        for (var k = 0; k < list.length; k++) {
            if(provice[j].id===list[k].superior)
                resultList.push(provice[j].provice+','+list[k].name)
        };
    };

    return resultList;
}

function cookuserinfo(req)
{
    // console.log('cookuserinfo----'+req.cookies["renrenxiang"]) ;
    if (req.cookies["wifiadminuser"]) {
        var userinfo =parseJSON(decrypt(req.cookies["wifiadminuser"]));
        //  console.log(userinfo) ;
        return userinfo ;
    }
    else
    {
        return null ;
    }
}

function cookCt(req)
{
    // console.log('cookuserinfo----'+req.cookies["renrenxiang"]) ;
    if (req.cookies["ct"]) {
        var userinfo =parseJSON(decrypt(req.cookies["ct"]));
        console.log('ct',userinfo);
        return userinfo ;
    }
    else
    {
        return null ;
    }
}
function getPageInfo(recordCount, pageSize) {
    var page = 0;
    if (pageSize > 0) {
        page = parseInt(recordCount / pageSize);
        if (recordCount % pageSize > 0) {
            page += 1;
        }
    }
    var pageInfo = {
        recordCount: recordCount,
        pageCount: page
    };

    return pageInfo;
}

function getPageData(items, pageSize, currentPage) {
    var pageData = [];
    var pageBegin = pageSize * (currentPage - 1);
    var pageEnd = pageSize * currentPage;
    if (items.length > pageBegin) {
        if (items.length > pageEnd) {
            pageData = items.slice(pageBegin, pageEnd);
        } else {
            pageData = items.slice(pageBegin);
        }
    }

    return pageData;
}

function delHtmlTag(str){
    return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}


//生成新闻
//mpath  模板
// options  数据
// html  生成地址
function write_html(mpath,options,html,callback) {
    fs.readFile(path.join(__dirname, "../views/")+mpath, function (e, v1) {
            var ret = v1.toString();
            var template = ejs.render(ret, options);
            fs.writeFile(path.join(__dirname,"../public/")+html, template, function (err) {
                callback(err,null)
            });
        }
    )
}

exports.delHtmlTag=delHtmlTag ;

exports.getPageInfo = getPageInfo;
exports.getPageData = getPageData;
exports.cookuserinfo=cookuserinfo ;
exports.sortJSONArry = sortJSONArry;
exports.formatFullDate = formatFullDate;
exports.distinct = distinct;
exports.getNumByChar = getNumByChar;
exports.getFixedRandomInt = getFixedRandomInt;
exports.getYYMMDD = getYYMMDD;
exports.getFixedInt = getFixedInt;
exports.getMd5 = getMd5;
exports.macToInt = macToInt;
exports.parseJSON = parseJSON;
exports.getFilePath = getFilePath;
exports.generateUUID = generateUUID;
exports.formatMac = formatMac;
exports.formatDate = formatDate;
exports.readableMac = readableMac;
exports.SPLITER = String.fromCharCode(0);
exports.toUnicode = toUnicode;
exports.deUnicode = deUnicode;
exports.encodeURIComponentGBK = encodeURIComponentGBK;
exports.getClientIp = getClientIp;
exports.getYYYYMMDD = getYYYYMMDD;
exports.addDays = addDays;
exports.convertDateParserString = convertDateParserString;
exports.jsonAppendJson = jsonAppendJson;
exports.uniqueArray=uniqueArray;
exports.recursionArea=recursionArea;
exports.cookCt=cookCt ;
exports.log4jserr=log4jserr ;
exports.log4jslog=log4jslog;
exports.write_html=write_html ;

if (!module.parent) {
    console.log(readableMac('22ffdd22aa44'));
}
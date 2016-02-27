$.prototype.slideLeft = function (time) {

}

function convertTimestampToFullDate(timestamp) {
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

function getUrl(name)

{

    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

    var r = window.location.search.substr(1).match(reg);  //匹配目标参数

    if (r!=null) return unescape(r[2]); return null; //返回参数值

}

function choiceall() {
    var str = "";
    $("input:checkbox").each(function () {
        if ($(this).attr("checked")) {
            str +=$(this).val() + ',' ;
        }
    })
    str = str.substring(0, str.length - 1);

    return str ;
}
(function($) {
    $.extend({
        urlGet:function()
        {
            var aQuery = window.location.href.split("?");   
            var aGET = new Array();
            if(aQuery.length > 1)
            {
                var aBuf = aQuery[1].split("&");
                for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
                {
                    var aTmp = aBuf[i].split("=");   
                    aGET[aTmp[0]] = aTmp[1];
                }
            }
            return aGET;
        }
    })
})(jQuery);


function toUnicode(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u"+res.join("\\u");
}
function deUnicode(str) {
    str=str.replace(/\\/g,"%");
    return unescape(str);
}


//---------------base64encode--------------------------
function base64encode(str) {//base64\u52a0\u5bc6
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
                | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {//base64\u89e3\u5bc6
    var base64DecodeChars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c1 == -1);
        if (c1 == -1) break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c2 == -1);
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)  return out;
            c3 = base64DecodeChars[c3];
        } while(i < len && c3 == -1);
        if(c3 == -1) break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if(c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while(i < len && c4 == -1);
        if(c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function fixedLayer(id)
{
    var obj11 = document.getElementById(id);
    var top11 = getTop(obj11);
    var isIE6 = /msie 6/i.test(navigator.userAgent);
    window.onscroll = function(){
     
    var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (bodyScrollTop > top11){
            obj11.style.position = (isIE6) ? "absolute" : "fixed";
            obj11.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
            obj11.style.background='#fff';
        }else {
            obj11.style.position = "static";
            obj11.style.background='#fff';
        }
    }
}

function getTop(e){ 
    var offset = e.offsetTop;
    if(e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}

//获得指定其日的字符串
function jscomGetDateStr(ftype_name){
    var ret_str,objDate;
    var year,month,day;
    
    objDate=new Date();
    year=objDate.getFullYear();
    month=objDate.getMonth()+1;
    day=objDate.getDate();

    switch(ftype_name){
        case "now_date":    //本日
                ret_str=year+"-"+month+"-"+day;
                break;
        case "yestoday":    //昨天
                objDate.setDate(objDate.getDate()-1);
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-"+day;
                break;
        case "now_week_begin":  //本周初
                objDate.setDate(objDate.getDate() +1-objDate.getDay());
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-"+day;
                break;
        case "now_week_end":    //本周末
                objDate.setDate(objDate.getDate()+7-objDate.getDay());
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-"+day;
                break;
        case "pre_week_begin":  //上周初
                objDate.setDate(objDate.getDate() +1 -7 -objDate.getDay());
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-"+day;
                break;
        case "pre_week_end":    //上周末
                objDate.setDate(objDate.getDate()-objDate.getDay());
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-"+day;
                break;
        case "month_begin": //本月初
                ret_str=year+"-"+month+"-1";
                break;
        case "month_end":   //本月末
                objDate.setMonth(month);
                objDate.setDate(0);
                ret_str=year+"-"+month+"-"+objDate.getDate();
                break;
        case "pre_month_begin": //上月初
                objDate.setMonth(objDate.getMonth()-1);
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-1";
                break;
        case "pre_month_end":   //上月末
                objDate.setMonth(month-1);
                objDate.setDate(0);
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-"+day;
                break;
        case "year_begin":  //本年初
                ret_str=year+"-01-01";
                break;
        case "year_end":    //本年末
                objDate.setMonth(12);
                objDate.setDate(0);
                ret_str=year+"-12-"+objDate.getDate();
                break;
        case "pre_year_begin":  //上年初
                year=year-1;
                ret_str=year+"-01-01";
                break;
        case "pre_year_end":    //上年末
                objDate.setYear(objDate.getYear()-1);
                objDate.setMonth(12);
                objDate.setDate(0);
                year=objDate.getFullYear();
                month=objDate.getMonth()+1;
                day=objDate.getDate();
                ret_str=year+"-"+month+"-"+day;
                break;
        default:    //本日
                ret_str=year+"-"+month+"-"+day;
                break;
    }
    return ret_str;
}

function selectJsDateTypeChanged(obj){
    var type=obj.value;
    var s1,s2;
    
    if(type == ""){
        return;
    }else if(type=="day"){
        s1=jscomGetDateStr("now_date");
        s2=s1;
    }else if(type=="month"){
        s1=jscomGetDateStr("month_begin");
        s2=jscomGetDateStr("month_end");
    }else if(type=="week"){
        s1=jscomGetDateStr("now_week_begin");
        s2=jscomGetDateStr("now_week_end");
    }else if(type=="perWeek"){
        s1=jscomGetDateStr("pre_week_begin");
        s2=jscomGetDateStr("pre_week_end");
    }else if(type=="year"){
        s1=jscomGetDateStr("year_begin");
        s2=jscomGetDateStr("year_end");
    }else if(type=="yestoday"){
        s1=jscomGetDateStr("yestoday");
        s2=s1;
    }else if(type=="perMonth"){
        s1=jscomGetDateStr("pre_month_begin");
        s2=jscomGetDateStr("pre_month_end");
    }else if(type=="preyear"){
        s1=jscomGetDateStr("pre_year_begin");
        s2=jscomGetDateStr("pre_year_end");
    }else{
        s1="";
        s2="";
    }   

    document.getElementById("txtStartDate").value=s1;
    document.getElementById("txtEndDate").value=s2;
    return false;
}
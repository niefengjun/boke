//公用JS，数据呈现、分页
var _RecordCount = 0;
var _PageSize = 20;
var _PageCount = 0;
var _CurrentPage = 1;

$.ajaxSetup({ cache: false });

//display data
function pageDataDisplay(data) {
    try { $("#ajaxDataList").css('display', ''); } catch (ex) { }
    try { $("#ajaxPageInfo").css('display', ''); } catch (ex) { }
    try { $("#ajaxDataLoading").css('display', 'none'); } catch (ex) { }

    var _result = data.split("|||***|||");
    switch (_result[0]) {
        case "-1":
            location.reload();
            break;
        case "-2":
            $("#ajaxDataList").html("传入参数错误...");
            try { $("#ajaxPageInfo").css('display', 'none'); } catch (ex) { }
            try { $("#ajaxPageButton").css('display', 'none'); } catch (ex) { }
            break;
        case "0":
            $("#ajaxDataList").html("没有找到任何数据...");
            try { $("#ajaxPageInfo").css('display', 'none'); } catch (ex) { }
            try { $("#ajaxPageButton").css('display', 'none'); } catch (ex) { }
            break;
        default:
            try { $("#ajaxPageButton").css('display', ''); } catch (ex) { }
            $("#ajaxDataList").html(_result[0]);
            try {
                if (_result.length == 2) {
                    var _ScriptUrl = _result[1].split(",");
                    for (var i = 1; i < _ScriptUrl.length; i++) {
                        var ScriptObj = document.createElement("script");
                        ScriptObj.src = _ScriptUrl[i];
                        document.body.appendChild(ScriptObj);
                    }
                }
            }
            catch (ex) { }
            break;
    }
}

// 分页数据显示
function pageInfoDisplay(data) {
//    var result = data;
//    var arrPageInfo = result.split(",")
    _RecordCount = data.recordCount;
    _PageCount = data.pageCount;
    ajaxGetPageHtmlText("ajaxListToPage");
}

function ajaxGetPageHtmlText(EventObj) {
    if (_PageCount <= 0) { $("#ajaxPageInfo").hide(); return; }
    $("#ajaxPageInfo").show();
    var HtmlText = "";
    //到首页
    var toFirst = "";
    if (_CurrentPage == 1) {
        toFirst = "<a class=\"disabled\"><span>首页</span></a>";
    } else {
        toFirst = "<a class=\"disabled\"><a href=\"#\" onclick=\"" + EventObj + "(1);\" title=\"首页\">首页</a></li>";
    }
    //到最后页
    var toEnd = "";
    if (_CurrentPage == _PageCount) {
        toEnd = "<a class=\"disabled\"><span>末页</span></a>"
    } else {
        toEnd = "<a class=\"disabled\"><a href=\"#\" onclick=\"" + EventObj + "(" + _PageCount + ");\" title=\"最后页\">末页</a></a>";
    }

    //页码显示
    var pageHtml = "";
    if (_PageCount > 5) {
        //当前页、当前页之前页码
        if (_CurrentPage > 3) {
            pageHtml = "<a class=\"disabled\"><span>…</span></a>";
            pageHtml += "<a class=\"disabled\"><a  href=\"#\" onclick=\"" + EventObj + "(" + (_CurrentPage - 2) + ");\">" + (_CurrentPage - 2) + "</a></li>";
            pageHtml += "<a class=\"disabled\"><a  href=\"#\" onclick=\"" + EventObj + "(" + (_CurrentPage - 1) + ");\">" + (_CurrentPage - 1) + "</a></li>";
            if (_CurrentPage != _PageCount)
                pageHtml += "<a class=\"disabled\"><a>" + _CurrentPage + "</a></a>";
        } else {
            for (i = 1; i <= _CurrentPage; i++) {
                var temp = "";
                if (i == _CurrentPage) {
                    temp = "<a class=\"disabled\"><span>" + i + "</span></a>";
                } else {
                    temp = "<a class=\"disabled\"><a href=\"#\" onclick=\"" + EventObj + "(" + i + ");\">" + i + "</a></a>";
                }
                pageHtml += temp;
            }
        }
        //当前页之后页码显示
        if (_PageCount - _CurrentPage > 2 || _PageCount - _CurrentPage == 2) {
            pageHtml += "<a class=\"disabled\"><a  href=\"#\" onclick=\"" + EventObj + "(" + (_CurrentPage + 1) + ");\">" + (_CurrentPage + 1) + "</a></li>";
            if (_PageCount - _CurrentPage > 2) {
                pageHtml += "<a class=\"disabled\"><a  href=\"#\" onclick=\"" + EventObj + "(" + (_CurrentPage + 2) + ");\">" + (_CurrentPage + 2) + "</a></li>";
            }
            if (_PageCount - _CurrentPage > 3) {
                pageHtml += "<a class=\"disabled\"><span>…</span></a>";
            }
        }
        if (_PageCount == _CurrentPage) {
            pageHtml += "<a class=\"disabled\"><a>" + _PageCount + "</a></a>";
        }
        else {
            pageHtml += "<a class=\"disabled\"><a  href=\"#\" onclick=\"" + EventObj + "(" + _PageCount + ");\">" + _PageCount + "</a></a>";
        }
    } else {
        if (_PageCount == 1) {
            pageHtml = "<a class=\"disabled\"><span>1</span></a>";
        } else {
            for (i = 1; i <= _PageCount; i++) {
                var temp = "";
                if (i == _CurrentPage) {
                    temp = "<a class=\"disabled\"><span>" + i + "</span></a>";
                } else {
                    temp = "<a class=\"disabled\"><a href=\"#\" onclick=\"" + EventObj + "(" + i + ");\">" + i + "</a></a>";
                }
                pageHtml += temp;
            }
        }
    }
    HtmlText = toFirst + pageHtml + toEnd;
    $("#ajaxPageInfo").html(HtmlText);
}

//搜索分页翻页
function ajaxListToPage(PageNo) {
    if (PageNo > 0 && PageNo <= _PageCount)
    { _CurrentPage = PageNo; } else {
        alert("页码值无效");
    }
    ajaxGetPageHtmlText("ajaxListToPage");
    ajaxGetList(false);
}
var _PageSize=15;

$(function(){
    $('#btnSubmit').click(function () {_CurrentPage=1;ajaxGetList(true); });
    ajaxGetList(true);
})

function ajaxGetList(GetPageInfo) {
    _PageSize=$('#sltPage').val();
    $('#ajaxDataList').hide();
    $('#ajaxDataLoading').show();
    $.ajax({
        type: "GET",
        url: "../rolepage/",
        data: "AjaxType=pagePageInfo&pageSize="+_PageSize+'&currentPage='+_CurrentPage
            +"&time=" + new Date(),
        success: function (result) {
            // alert(result['pageInfo']);
            if(GetPageInfo)
            {
                pageInfoDisplay(result['pageInfo']);
            }

            var html="";
            if(result.pageData.length>0)
            {
                var items=result['pageData'];
                for(var i=0;i<items.length;i++)
                {
                    html+='<tr>';
                    html+='<td>'+$.parseJSON(items[i])._id+'</td>';


                    html+='<td>'+$.parseJSON(items[i]).rolename+'</td>';
                    html+='<td><a href=/setting/RoleSet/?id='+$.parseJSON(items[i])._id+'&name='+escape($.parseJSON(items[i]).rolename)+'>设置权限</td>';

                    html+='</tr>';

                }
            }else
            {
                html="<tr><td colspan='7'>未找到任何数据</td></tr>";
            }
            $('#ajaxDataList').html(html);
            $('#ajaxDataList').show();
            $('#ajaxDataLoading').hide();
        }
    });
}

function showModal(uuid){
    $.fancybox({
        'autoScale': true,
        'showNavArrows': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'scrolling':false,
        'hideOnOverlayClick':false,
        'type': 'iframe',
        'width':750,
        'height':550,
        'href': '../channel/auth/'+uuid

    });
}
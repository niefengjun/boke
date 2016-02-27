var _PageSize=15;
var _pageInfo=true;

$(function(){
    $('#btnSubmit').click(function () {_CurrentPage=1;ajaxGetList(); });
	ajaxGetList();
})

function ajaxGetList() {
	_PageSize=$('#sltPage').val();
	$('#ajaxDataList').hide();
	$('#ajaxDataLoading').show();
	$.ajax({
	    type: "GET", 
	    url: "../finance/shopRewardApplyList", 
	    data: "AjaxType=pagePageInfo&pageSize="+_PageSize+'&currentPage='+_CurrentPage
	    	+"&channelId="+$('#txtID').val()
	    	+"&name="+escape($('#txtName').val())
	    	+"&status="+$('#sltStatus').val()
	        +"&time=" + new Date(), 
	    success: function (result) {
	    	// alert(result['pageInfo']);
	    	if(_pageInfo)
	    	{
	    		pageInfoDisplay(result['pageInfo']);
	    	}
		    // alert(result);
		     var html="";
			 if(result.pageData.length>0) 
			 {
			  	var items=result['pageData'];
			  	for(var i=0;i<items.length;i++)
			  	{
			  	 	html+='<tr>';
			    	html+='<td>'+items[i].location.shopID+'</td>';
			  	 	html+='<td class="auto">';
			  	 	html+=items[i].location.title +'</td>';
			    	html+='<td>'+items[i].channelCompany+'('+items[i].channelID+')'+'</td>';
			    	html+='<td>'+items[i].location.area+'</td>';
			    	html+='<td>'+items[i].checkCycleStart +'--'+items[i].checkCycleEnd+'</td>';
			    	html+='<td>'+items[i].applyTime+'</td>';
			    	if(items[i].status=='waitAudit')
			    	{
			    		html+='<td>待审核</td>';
			    	}else if(items[i].status=='auditing')
			    	{
			    		html+='<td>审核中</td>';
			    	}else if(items[i].status=='audited')
			    	{
			    		html+='<td>审核通过</td>';
			    	}else if(items[i].status=='nopass')
			    	{
			    		html+='<td>审核未通过</td>';
			    	}
			    	html+='<td>'+(items[i].money?items[i].money:'-')+'</td>';
			    	html+='<td><a href="#" onclick="showAuthModal(\''+items[i]._id +'\')">操作</a></td>';
			    	html+='</tr>';
				}
			}else
			{
	                html="<tr><td colspan='9'>未找到任何数据</td></tr>";
			}
			$('#ajaxDataList').html(html);
			$('#ajaxDataList').show();
			$('#ajaxDataLoading').hide();
		}
	});
}

function showAuthModal(uuid,timestamp,step){
	 $.fancybox({
        'autoResize': true,
        'type': 'iframe',
        'width':650,
        'height':350,
		'afterClose':ajaxGetList,
        'href': '../finance/shopRewardApplyAuth?uuid='+uuid+"&timestamp="+timestamp+"&step="+step
    });
}
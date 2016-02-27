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
	    url: "../finance/depositOperationLogList", 
	    data: "AjaxType=pagePageInfo&pageSize="+_PageSize+'&currentPage='+_CurrentPage
	    	+"&channelId="+$('#txtID').val()
	    	+"&name="+escape($('#txtName').val())
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
			    	html+='<td>'+items[i].channelID+'</td>';
			    	html+='<td>'+items[i].company+'</td>';
			    	html+='<td>'+items[i].operator+'</td>';
			    	html+='<td>'+(items[i].key?(convertTimestampToFullDate(items[i].time)):items[i].time)+'</td>';		//新旧版 本时间格式不一样，旧版本没有uuid，据此判断时间格式
			    	
			    	html+='<td>'+items[i].preMoney+'</td>';
			    	html+='<td>'+items[i].money+'</td>';

	  	 			if(items[i].firstAuditStatus)
	  	 			{
	  	 				if(items[i].firstAuditStatus=='yes')
	  	 				{
					  	 	html+='<td>';
			  	 			html+='<img src="../images/Icon_0042.gif" title="审核通过" />';
					  	 	html+='</td>';
						}else if(items[i].firstAuditStatus=='no'){
					  	 	html+='<td>';
			  	 			html+='<img src="../images/Icon_0043.gif" title="审核未通过：'+(items[i].firstAuditReson?items[i].firstAuditReson:"")+'" />';
			  	 			html+='</td>';
						}else{
					    	html+='<td></td>';
						}
					}else{
				    	html+='<td></td>';
					}

	  	 			if(items[i].secondAuditStatus)
	  	 			{
	  	 				if(items[i].secondAuditStatus=='yes')
	  	 				{
					  	 	html+='<td>';
			  	 			html+='<img src="../images/Icon_0042.gif" title="审核通过" />';
					  	 	html+='</td>';
						}else if(items[i].secondAuditStatus=='no'){
					  	 	html+='<td>';
			  	 			html+='<img src="../images/Icon_0043.gif" title="审核未通过：'+(items[i].secondAuditReson?items[i].secondAuditReson:"")+'" />';
			  	 			html+='</td>';
						}else{
					    	html+='<td></td>';
						}
					}else{
				    	html+='<td></td>';
					}

	  	 			if(items[i].finalAuditStatus)
	  	 			{
	  	 				if(items[i].finalAuditStatus=='yes')
	  	 				{
					  	 	html+='<td>';
			  	 			html+='<img src="../images/Icon_0042.gif" title="审核通过" />';
					  	 	html+='</td>';
						}else if(items[i].finalAuditStatus=='no'){
					  	 	html+='<td>';
			  	 			html+='<img src="../images/Icon_0043.gif" title="审核未通过：'+(items[i].finalAuditReson?items[i].finalAuditReson:"")+'" />';
			  	 			html+='</td>';
						}else{
					    	html+='<td></td>';
						}
					}else{
				    	html+='<td></td>';
					}

					if(items[i].key)
					{
				    	html+='<td><a href="#" onclick="showModal(\''+items[i].key +'\')">查看记录</a></td>';
					}else
					{
				    	html+='<td></td>';
					}
					html+='</tr>';

			  }
			}else
			{
	                html="<tr><td colspan='10'>未找到任何数据</td></tr>";
			}
			$('#ajaxDataList').html(html);
			$('#ajaxDataList').show();
			$('#ajaxDataLoading').hide();
		}
	});
}

function showModal(uuid){
	 $.fancybox({
        'autoResize': true,
        'type': 'iframe',
        'width':650,
        'height':350,
        'href': '../finance/depositOperationLogInfo/'+uuid
        
    });
}
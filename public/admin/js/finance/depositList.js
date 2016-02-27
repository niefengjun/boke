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
	    url: "../finance/depositList", 
	    data: "AjaxType=pagePageInfo&pageSize="+_PageSize+'&currentPage='+_CurrentPage
	    	+"&email="+$('#txtEmail').val()
	    	+"&channelId="+$('#txtID').val()
	    	+"&status="+$('#sltStatus').val()
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
			  	 	html+='<td class="auto">';
			  	 	html+='<a href="#" onclick="showModal(\''+items[i].user +'\')">'+items[i].company +'</a></td>';
			    	html+='<td>'+items[i].email+'</td>';
			    	if(items[i].depositMoney)
			    	{
				    	html+='<td>'+items[i].depositMoney+'</td>';
			    	}else
			    	{
			    		html+='<td>0</td>';
			    	}
			    	if(items[i].depositStatus=='yes')
			    	{
			    		html+='<td>已交</td>';
			    	}else if(items[i].status=='noNeed')
			    	{
			    		html+='<td>不需要</td>';
			    	}else if(items[i].status=='backed')
			    	{
			    		html+='<td>已退</td>';
			    	}else
			    	{
			    		html+='<td>未交</td>';
			    	}
			    	html+='<td>'+(items[i].depositAdjustMoney?items[i].depositAdjustMoney:'0')+'</td>';
			  	 	if(items[i].depositAdjustStatus&&items[i].depositInfo)
			  	 	{
		  	 			if(items[i].depositInfo.firstAuditStatus)
		  	 			{
		  	 				if(items[i].depositInfo.firstAuditStatus=='yes')
		  	 				{
						  	 	html+='<td>';
				  	 			html+='<img src="../images/Icon_0042.gif" title="审核通过" />';
						  	 	html+='</td>';
				  	 			//初审通过后，进入复审流程
				  	 			if(items[i].depositInfo.secondAuditStatus)
				  	 			{
				  	 				if(items[i].depositInfo.secondAuditStatus=='yes')
				  	 				{
								  	 	html+='<td>';
						  	 			html+='<img src="../images/Icon_0042.gif" title="审核通过" />';
								  	 	html+='</td>';	
								  	 	//终审流程									  	 	
						  	 			if(items[i].depositInfo.finalAuditStatus)
						  	 			{
						  	 				if(items[i].depositInfo.finalAuditStatus=='yes')
						  	 				{
										  	 	html+='<td>';
								  	 			html+='<img src="../images/Icon_0042.gif" title="审核通过" />';
										  	 	html+='</td>';	
						  	 				}else if(items[i].depositInfo.finalAuditStatus=='no')
						  	 				{		
										  	 	html+='<td>';
								  	 			html+='<img src="../images/Icon_0043.gif" title="审核未通过：'+items[i].depositInfo.finalAuditReson+'" />';
								  	 			html+='</td>';

						  	 				}else
						  	 				{		  	 		
						  	 					if(result['authPermission']&&result['authPermission']==true)
						  	 					{
											  	 	html+='<td>';
								  	 				html+='<a href="#" onclick="showAuthModal(\''+items[i].user +'\',\''+items[i].depositAdjustTime+'\',\'final\')">确认</a>';
											  	 	html+='</td>';						  	 						
						  	 					}else
						  	 					{
											  	 	html+='<td>';
											  	 	html+='</td>';						  	 						
						  	 					}
						  	 				}
						  	 			}else{						
						  	 					if(result['authPermission']&&result['authPermission']==true)
						  	 					{
											  	 	html+='<td>';
								  	 				html+='<a href="#" onclick="showAuthModal(\''+items[i].user +'\',\''+items[i].depositAdjustTime+'\',\'final\')">确认</a>';
											  	 	html+='</td>';						  	 						
						  	 					}else
						  	 					{
											  	 	html+='<td>';
											  	 	html+='</td>';						  	 						
						  	 					}
						  	 			}

				  	 				}else if(items[i].depositInfo.secondAuditStatus=='no')
				  	 				{
				  	 					//审核未通过不进入终审流程					
								  	 	html+='<td>';
						  	 			html+='<img src="../images/Icon_0043.gif" title="审核未通过：'+items[i].depositInfo.secondAuditReson+'" />';
								  	 	html+='</td>';
								  	 	html+='<td>';
								  	 	html+='</td>';
				  	 				}else
				  	 				{
				  	 					if(result['authPermission']&&result['authPermission']==true)
				  	 					{
									  	 	html+='<td>';
						  	 				html+='<a href="#" onclick="showAuthModal(\''+items[i].user +'\',\''+items[i].depositAdjustTime+'\',\'second\')">确认</a>';
									  	 	html+='</td>';						  	 						
				  	 					}else
				  	 					{
									  	 	html+='<td>';
									  	 	html+='</td>';						  	 						
				  	 					}
								  	 	html+='<td>';
								  	 	html+='</td>';
				  	 				}
				  	 			}else
				  	 			{
			  	 					if(result['authPermission']&&result['authPermission']==true)
			  	 					{
								  	 	html+='<td>';
					  	 				html+='<a href="#" onclick="showAuthModal(\''+items[i].user +'\',\''+items[i].depositAdjustTime+'\',\'second\')">确认</a>';
								  	 	html+='</td>';						  	 						
			  	 					}else
			  	 					{
								  	 	html+='<td>';
								  	 	html+='</td>';						  	 						
			  	 					}
							  	 	html+='<td>';
							  	 	html+='</td>';
				  	 			}
		  	 				}else if(items[i].depositInfo.firstAuditStatus=='no')
		  	 				{
		  	 					//审核未通过不进入复审流程					
						  	 	html+='<td>';
				  	 			html+='<img src="../images/Icon_0043.gif" title="审核未通过：'+items[i].depositInfo.firstAuditReson+'" />';
				  	 			
						  	 	html+='</td>';
						  	 	html+='<td>';
						  	 	html+='</td>';
						  	 	html+='<td>';
						  	 	html+='</td>';
		  	 				}else
		  	 				{			
		  	 					if(result['authPermission']&&result['authPermission']==true)
		  	 					{
							  	 	html+='<td>';
				  	 				html+='<a href="#" onclick="showAuthModal(\''+items[i].user +'\',\''+items[i].depositAdjustTime+'\',\'first\')">确认</a>';
							  	 	html+='</td>';						  	 						
		  	 					}else
		  	 					{
							  	 	html+='<td>';
							  	 	html+='</td>';						  	 						
		  	 					}
						  	 	html+='<td>';
						  	 	html+='</td>';
						  	 	html+='<td>';
						  	 	html+='</td>';
		  	 				}
		  	 			}else
		  	 			{
	  	 					if(result['authPermission']&&result['authPermission']==true)
	  	 					{
						  	 	html+='<td>';
			  	 				html+='<a href="#" onclick="showAuthModal(\''+items[i].user +'\',\''+items[i].depositAdjustTime+'\',\'first\')">确认</a>';
						  	 	html+='</td>';						  	 						
	  	 					}else
	  	 					{
						  	 	html+='<td>';
						  	 	html+='</td>';						  	 						
	  	 					}
					  	 	html+='<td>';
					  	 	html+='</td>';
					  	 	html+='<td>';
					  	 	html+='</td>';	  	 	
		  	 			}			  	 		
			  	 	}
			  	 	else
			  	 	{
				  	 	html+='<td>';
				  	 	html+='</td>';
				  	 	html+='<td>';
				  	 	html+='</td>';
				  	 	html+='<td>';
				  	 	html+='</td>';			  	 		
			  	 	}
			    	html+='<td><a href="#" onclick="showModal(\''+items[i].user +'\')">编辑</a></td>';
			    	html+='</tr>';
				}
			}else
			{
	                html="<tr><td colspan='6'>未找到任何数据</td></tr>";
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
		'afterClose':ajaxGetList,
        'href': '../finance/depositInfo/'+uuid
        
    });
}

function showChannelInfo(uuid){
	 $.fancybox({
        'autoResize': true,
        'type': 'iframe',
        'width':750,
        'height':550,
        'href': '../channel/info/'+uuid
        
    });
}

function showAuthModal(uuid,timestamp,step){
	 $.fancybox({
        'autoResize': true,
        'type': 'iframe',
        'width':650,
        'height':350,
		'afterClose':ajaxGetList,
        'href': '../finance/depositAuth?uuid='+uuid+"&timestamp="+timestamp+"&step="+step
    });
}
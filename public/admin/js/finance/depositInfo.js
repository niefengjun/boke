
$(function(){
	$("#btnSubmit").click(function(){
      	postDepositInfo();
    })
	pageInit();
})

function pageInit()
{
	$("#depositStatus").attr('value',$('#hidDepositStatus').val()); 
}

function postDepositInfo(){
    $.ajax({
      type:'post',
      url:'/finance/depositInfo',
      data:{"uuid":$("#hidChannelid").val(),"preStatus":$("#hidDepositStatus").val(),"status":$("#depositStatus").val(),"preMoney":$("#depositMoney").val(),"money":($("#depositAdjustMoney").val().length>0?$("#depositAdjustMoney").val():$("#depositMoney").val())},
      dataType:'json',
      success:function(data){
        if(data.status=='success'){
          alert('更新成功');
        }else{
          //提示
          alert(data.msg);
        }
        parent.$.fancybox.close();
      }
  })
}

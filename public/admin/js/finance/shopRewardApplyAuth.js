
$(function(){
	$("#btnSubmit").click(function(){
      	postDepositInfo();
    })
})

function postDepositInfo(){
  if($("input:radio[name=auditStatus]:checked").val()=='yes' && $("#rewardMoney").val().length==0)
  {
    alert("审核金额不能为空");
    return;
  }

  $.ajax({
      type:'POST',
      url:'/finance/shopRewardApplyAuth',
      data:{"locationId":$("#hidID").val(),"status":$("input:radio[name=auditStatus]:checked").val(),"money":$("#rewardMoney").val(),"reson":encodeURI($("#auditReson").val())},
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

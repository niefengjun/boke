
$(function(){
	$("#btnSubmit").click(function(){
      	postDepositInfo();
    })
})

function postDepositInfo(){
  $.ajax({
      type:'post',
      url:'/finance/depositAuth',
      data:{key:$("#hidAuthKey").val(),status:$("input:radio[name=auditStatus]:checked").val(),step:$("#hidStep").val(),reson:encodeURI($("#auditReson").val())},
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


define(["jquery"],function($){
    function registerSend(){
        //发生我们的数据
        $("#register-button").click(function(){
            $.ajax({
                type:"post",
                url:"./php/register.php",
                data:{
                    username:$(".item_account").eq(0).val(),
                    password:$(".item_account").eq(1).val(),
                    repassword:$(".item_account").eq(2).val(),
                    createtime:(new Date()).getTime()   //获取当前系统时间
                },
                success:function(result){
                    //解析数据
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $(".err_tip").find("em").attr("class","icon_error");
                        $(".err_tip").find("span").css("color","");
                    }else{
                        $(".err_tip").find("em").attr("class","icon_select icon_true");
                        $(".err_tip").find("span").css("color","green");
                    }
                    $(".err_tip").show().find("span").html(obj.message);
                    setTimeout(function(){ //启动定时器自动跳转
                        location.assign("login.html");
                    },10)
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }


    return{
        registerSend:registerSend
    }
})
define(["jquery"],function($){
    function loginsend(){
        $("#login-button").click(function(){
            $.ajax({
                type:"post",
                url:"./php/login.php",
                data:{
                    username:$("#region-code").find("input").val(),
                    password:$(".lgn_inputbg .pwd_panel").find("input").val()
                },
                success:function(result){
                    var obj =JSON.parse(result);
                    if(obj.code){
                        $(".err_tip").find("em").attr("class","icon_error");
                        $(".err_tip").find("span").css("color","");
                    }else{
                        $(".err_tip").find("em").attr("class","icon_select icon_true");
                        $(".err_tip").find("span").css("color","green");
                        setTimeout(function(){
                            location.assign("index.html");
                        })
                    }
                    $(".err_tip").show().find("span").html(obj.message);
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }

    return {
        loginsend:loginsend  
    }
})
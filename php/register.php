<?php
    header('content-type:text/html;charset="utf-8"');  

    //定义一个统一的返回模式
    $responseData = array("code"=> 0,"message"=> "");//统一返回格式

    //取出数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];
    $createtime = $_POST["createtime"];

    //先对数据进行验证
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        //按照统一的格式返回
        echo json_encode($responseData);  //转成json格式字符串
        exit;
    }

    if(!$password){
        $responseData["code"] =2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$repassword){
        $responseData["code"] =7;
        $responseData["message"] = "请确认密码";
        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData["code"] =3;
        $responseData["message"] = "输入密码不一致";
        echo json_encode($responseData);
        exit;
    }

    //1.连接数据库，判断用户名是否存在
    $link=mysql_connect('localhost','root','123456');
    //2.判断是否连接成功
    if(!$link){
        $responseData["code"] =4;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }
    //3.设置字符集
    mysql_set_charset("utf-8");
    //4.选择数据库
    mysql_select_db("xiaomi");
    //5.准备SQL语句验证用户是否存在
    $sql1 = "SELECT * FROM users WHERE username ='{$username}'";
    //6.发送sql语句
    $res = mysql_query($sql1);

    //7.判断是否有数据（取出一行数据，ps：如果不重名则有数据）
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseData["code"] =5;
        $responseData["message"] = "用户名已存在";
        echo json_encode($responseData);
        exit;
    }
    //密码需要加密注册  MD5加密
    $str =md5(md5(md5($password)."xxx")."yyy");
    //注册用户
    $sql2 = "INSERT INTO users(username,password,creat_time) VALUES('{$username}','{$str}','{$createtime}')";
    $res2 = mysql_query($sql2);

    //判断是否插入成功
    if(!$res2){
        //用户名重名
        $responseData["code"] = 6;
        $responseData["message"] = "注册失败";
        echo json_encode($responseData);
    }else{
        $responseData["message"] = "注册成功";
        echo json_encode($responseData);
    }
    //8.关闭数据库
    mysql_close($link);
    
?>
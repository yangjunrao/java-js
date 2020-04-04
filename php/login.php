<?php
    header('content-type:text/html;charset="utf-8"');
    //定义一个统一的返回模式
    $responseData = array("code"=> 0,"message"=> "");//统一返回格式

    //取出数据
    $username = $_POST["username"];
    $password = $_POST["password"];

    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        //按照统一的格式返回
        echo json_encode($responseData);  //转成json格式字符串
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        //按照统一的格式返回
        echo json_encode($responseData);  //转成json格式字符串
        exit;
    }

    //1.连接数据库
    $link =  mysql_connect('localhost','root','123456');
    //2.判断是否连接成功
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "服务器繁忙";
        //按照统一的格式返回
        echo json_encode($responseData);  //转成json格式字符串
        exit;
    }
    //3.设置字符集
    mysql_set_charset('utf-8');
    //4.选择数据库
    mysql_select_db('xiaomi');
    //md5加密
    $str =md5(md5(md5($password)."xxx")."yyy");
    //5.准备sql语句
    $sql1 = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";
    //6.发生sql语句
    $res=mysql_query($sql1);
    //7.判断是否正确
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或者密码错误";
        //按照统一的格式返回
        echo json_encode($responseData);  //转成json格式字符串
        exit;
    }else{
        $responseData["message"] = "登录成功";
        //按照统一的格式返回
        echo json_encode($responseData);  //转成json格式字符串
    }
    //8.关闭数据库
    mysql_close($link);
?>
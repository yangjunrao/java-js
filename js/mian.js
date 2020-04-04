console.log('加载成功');


/* 
    配置当前这个项目用到了那些模块
    遵从的都是AMD规范

    所有的.js文件，后缀都可以省略
*/

//配置路径
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "slide":"slide",
        "data":"data"
    },
    //设置依赖关系
    shim:{
        "jquery-cookie":["jquery"]//先加载jquery 再加载jquery-cookie
    }
})

require(["nav","slide","data"],function(nav,slide,data){
    nav.download();
    nav.banner();
    nav.leftNavDownload();
    nav.lefNavTab();
    nav.topNavdownload();
    nav.topNavTab();
    nav.searchTab();

    //主页抢购列表数据的加载
    slide.download();
    slide.slideTab();

    //主页的数据
    data.download();
    data.tabMenue();
})


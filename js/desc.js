console.log("加载成功");

//配置路径,引入模块

require.config({
    paths:{
        "jquery":"jquery-1.11.3",    
        //引入首页顶部导航栏和侧边栏的js模块
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "goodsDesc":"goodsDesc"
    },
    //设置依赖关系
    shim:{
        "jquery-cookie":["jquery"]
    }
});



require(["nav","goodsDesc"],function(nav,goodsDesc){
    nav.leftNavDownload();
    nav.topNavdownload();
    nav.lefNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();


    //商品详情页数据
    goodsDesc.download();
    goodsDesc.banner();

})


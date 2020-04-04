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
        //引入首页顶部导航栏和侧边栏的js模块
        "nav":"nav",
        "goods":"goods"
    }
})

require(["nav",'goodslist'],function(nav,goodslist){
    //引入顶部，侧边栏数据 以及鼠标移入移出  和搜索框点击效果
    nav.leftNavDownload();
    nav.topNavdownload();
    nav.lefNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();//全部商品分类移入移出效果

    //商品数据加载
    goodslist.download();
    goodslist.banner();
})
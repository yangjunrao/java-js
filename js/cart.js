console.log("加载成功");

//配置路径，引入模块化功能
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "goodsCart":"goodsCart"
    },
    //设置依赖关系
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["goodsCart"],function(goodsCart){
    goodsCart.download();
    goodsCart.cartMover();
    goodsCart.loadCarData();
    goodsCart.checkFunc();
    goodsCart.isCheckAll();
    goodsCart.changeCars();
})

define(["jquery","jquery-cookie"],function($){
    //加载已经在购物车中的商品
    /*cookie中只有商品的id 和数目  但是在家购物车时必要要走商品的具体信息 数据源中加载
    所有数据源
    1.goodsCarList.json
    2.goodslist.json
    注：找出加入购物车中的商品的数据（详情）
    */



   //分两次加载数据   异步串行 按照顺序加载数据的流程 new Promise处理两次数据按照顺序加载
    function loadCarData(){

        //每次添加数据之前，先将上一次添加的数据页面清空
        $(".item-box .item-table").html("")

        new Promise(function(resolve,reject){//new Promise处理两次数据按照顺序加载
            $.ajax({
                type:"get",
                url:"../data/goodsCarList.json",
                success:function(result){
                    var arr =result.data;
                    resolve(arr);
                },
                error:function(msg){
                    reject(msg);
                }
            })
        }).then(function(arr1){ //arr1 是上面接收到的数据arr
            //下载第二份数据
           return new Promise(function(resolve,reject){
            $.ajax({
                type:"get",
                url:"../data/goodsList2.json",  
                success:function(arr2){
                    //将两份数据合拼 合并成新的数组
                    var newArr = arr1.concat(arr2);  //concat 字符串连接  等同于+
                    resolve(newArr);
                },
                error:function(msg){
                    reject(msg);
                }
            })
           }).then(function(arr3){  //arr3是上面resolve的newArr
            //arr3是全部商品的数据，需要在页面上加载 加入购物车的数据
            //通过已经加入购物车的商品，找出那些数据被加入在购物车

            //拿到cookie中的数据
            var cookie1 =JSON.parse($.cookie("goods"));
            var newARR =[];//
            
                for(var i =0;i<arr3.length;i++){
                    for(var j=0;j<cookie1.length;j++){
                        if(arr3[i].productid== cookie1[j].id || arr3[i].product_id == cookie1[j].id){
                            arr3[i].num=cookie1[j].num;
                            
                            //设置商品id  统一id
                            arr3[i].id =arr3[i].product_id? arr3[i].product_id : arr3[i].productid;
                            newARR.push(arr3[i]);  //存储中购物车中商品的数据  商品的信息数量等
                            break;
                        }
                    }
                }
        
            isCheckAll();
            
            //通过循环将数据添加到页面上
            for(var k=0;k<newARR.length;k++){
                var node =$(`<div class="item-row clearfix" id=${newARR[k].id}> 
                <div class="col col-check">  
                    <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                </div> 
                <div class="col col-img">  
                    <a href="//item.mi.com/${newARR[k].id}.html" target="_blank"> 
                        <img alt="" src="${newARR[k].image}" width="80" height="80"> 
                    </a>  
                </div> 
                <div class="col col-name">  
                    <div class="tags">   
                    </div>     
                    <div class="tags">  
                    </div>   
                    <h3 class="name">  
                        <a href="//item.mi.com/${newARR[k].id}.html" target="_blank"> 
                        ${newARR[k].name}
                        </a>  
                    </h3>        
                </div> 
                <div class="col col-price"> 
                ${newARR[k].price}元 
                    <p class="pre-info">  </p> 
                </div> 
                <div class="col col-num">  
                    <div class="change-goods-num clearfix J_changeGoodsNum"> 
                        <a href="javascript:void(0)" class="J_minus">
                            <i class="iconfont"></i>
                        </a> 
                        <input tyep="text" name="2192300031_0_buy" value="${newARR[k].num.toFixed(1)}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                        <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                    </div>  
                </div> 
                <div class="col col-total"> 
                ${(newARR[k].price)*newARR[k].num.toFixed(1)}元 
                    <p class="pre-info">  </p> 
                </div> 
                <div class="col col-action"> 
                    <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                </div> 
            </div>`);
            node.appendTo(".item-box .item-table");
            }
            isCheckAll();
           })
        })
    }


    function download(){ //下载热品中的数据
        isCheckAll();
        $.ajax({
            type:"get",
            url:"../data/goodsCarList.json",
            success:function(result){
                var arr = result.data;
                for(var i = 0;i<arr.length;i++){
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="//item.mi.com/1181300007.html"> 
                                <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="//item.mi.com/1181300007.html"> 
                            ${arr[i].name} 
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a href="#" class="btn btn-small btn-line-primary J_xm-recommend-btn" style="display: none;" id=${arr[i].productid}>加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`).appendTo("#J_miRecommendBox .xm-recommend ul")
                        

                }
                
            },
            error:function(msg){
                alert(msg)
            }

        })
    }
    function cartMover(){//添加移入移出效果
        $("#J_miRecommendBox .xm-recommend ul").on("mouseenter",".J_xm-recommend-list",function(){
            $(this).find(".xm-recommend-tips a").css("display","block");
        })
        $("#J_miRecommendBox .xm-recommend ul").on("mouseleave",".J_xm-recommend-list",function(){
            $(this).find(".xm-recommend-tips a").css("display","none");
        })

        //添加购物车操作
        $("#J_miRecommendBox .xm-recommend ul").on("click",".xm-recommend-tips .btn",function(){
            var id =this.id;
            // alert(id);
            var first = $.cookie("goods")==null? true:false;  //判断是否是第一次添加
            if(first){
                //创建cookie
                var cookieArr = [{id:id,num:1}];
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }else{
                var same = false;//假设之前没有添加过
                var Arr = JSON.parse($.cookie("goods"));
                for(var i=0;i<Arr.length;i++){
                    if(Arr[i].id == id){
                        Arr[i].num++;
                        same =true;
                        break;
                    }
                }
                if(!same){
                   var newCookiestr ={id:id,num:1};
                   Arr.push(newCookiestr);
                }
                //最后全部存回cookie中
                $.cookie("goods",JSON.stringify(Arr),function(){
                    expires:7
                })
            }
            // alert($.cookie("goods"));
            isCheckAll();
            loadCarData();//添加购物车后 刷新数据
            return false
        })
    }

    //全选按钮和复选按钮添加点击
    function checkFunc(){
        //全选
        $(".cart-goods-list .list-head .col-check").find("i").click(function(){
            //获取每一个单个商品的选项框
            var allChecks = $("#J_cartListBody").find(".item-row .col-check").find("i");

            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(allChecks).removeClass("icon-checkbox-selected");

            }else{
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
        //单选框(复选框)的点击按钮
        $("#J_cartListBody").on("click",".item-row .col-check i",function(){
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(".cart-goods-list .list-head .col-check i").removeClass("icon-checkbox-selected");

            }else{
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
    }

        //判断有多少个被选中
        function isCheckAll(){
        //获取到所有的check节点
        var allChecks = $("#J_cartListBody").find(".item-row");
        var isAll = true;//假设都没有选中
        var total = 0;//计算总数的
        var count = 0;//记录数量的
        var totalCount = 0;//记录总数
        
        allChecks.each(function(index,item){
            if(!$(item).find(".col-check i").hasClass("icon-checkbox-selected")){
                //判断商品有没有被选中
                isAll=false;
            }else{
                total+=parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(this).find(".col-num input").val());
                //被选中的商品有多少件
                count+=parseInt($(this).find(".col-num input").val());
            }
            //所有被加载购物车的商品有多少件
            totalCount +=parseInt($(this).find(".col-num input").val());
        })
        //设置页面
        $("#J_cartTotalNum").html(totalCount);
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalPrice").html(total.toFixed(1));

        //判断当前是否是全选
        if(isAll){
            $(".cart-goods-list .list-head .col-check").find("i").addClass("icon-checkbox-selected");
        }else{
            $(".cart-goods-list .list-head .col-check").find("i").removeClass("icon-checkbox-selected");
        }
        
    }

    //给页面上的商品添加删除，或者数量增减的操作
    function changeCars(){
        //给每一个按钮添加点击事件
        $("#J_cartListBody .J_cartGoods").on("click",".col-action .J_delGoods",function(){//点击x
            var id = $(this).closest(".item-row").remove().attr("id");  //closest从自身开始查找找到符合条件的第一个元素
            //删除cookie
            var cookiesStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookiesStr);
            for(var i=0;i<cookieArr.length;i++){
                if(id==cookieArr[i].id){
                    //删除数据
                    cookieArr.splice(i,1);//splice（start，length，数据1，数据2）  增加 删除 修改
                }
            }
            cookieArr.length == 0? $.cookie("goods",null) :$.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })
            isCheckAll(); //删除数据后 也需要重新加载数据
            return false;
        })
        //给每一个加和减添加一个点击事件
        $("#J_cartListBody .J_cartGoods").on("click",".J_minus , .J_plus",function(){
            //找到所在商品的id
            var id = $(this).closest(".item-row").attr("id");
            var cookiesStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookiesStr);
            for(var i =0;i<cookieArr.length;i++){
                if(id==cookieArr[i].id){//找到
                    if(this.className=="J_minus"){
                        cookieArr[i].num ==1 ? alert("数量为1 不能减少！") : cookieArr[i].num--;
                    }else{
                        cookieArr[i].num ++;
                    }
                    break;
                } 
            }
            //更新一下页面的商品的数量
            $(this).siblings("input").val(cookieArr[i].num);
            //更新一下页面上商品的价格
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
            $(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1)+"元");

            //更改数据存储到cookie
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })

            //重新计算总价
            isCheckAll();
            return false;
        })
    }

 
    return{
        download:download,
        cartMover:cartMover,
        loadCarData:loadCarData,
        checkFunc:checkFunc,
        isCheckAll:isCheckAll,
        changeCars:changeCars
    }
})
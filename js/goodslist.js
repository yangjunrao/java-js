//详情列表页数据加载
define(["jquery"],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/goodsList2.json",
            success:function(result){
                //创建大的商品
                var node1 =$(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-a2d6c756 class="channel-product-imgText">
                        <div data-v-a2d6c756 class = 'channel-product-top'>
                            <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                <div data-v-a2d6c756 class = 'figure'>
                                    <a href="goodsDesc.html?product_id=${result[0].product_id}">
                                        <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${result[0].image}" alt=""/>
                                    </a>
                                </div>
                                <div data-v-a2d6c756 class = 'content'>
                                    <h3 data-v-a2d6c756 class = 'title'>
                                        <a data-v-a2d6c756 href="goodsDesc.html?product_id=${result[0].product_id}">
                                            ${result[0].name}
                                        </a>
                                    </h3> 
                                    <p data-v-a2d6c756 class = 'desc'>${result[0].desc}</p>
                                    <p data-v-a2d6c756 class = 'price'>
                                        <strong data-v-a2d6c756>${result[0].price}</strong>元

                                        <span data-v-a2d6c756>起</span><del data-v-a2d6c756>${result[0].del}</del>
                                    </p>
                                    <p data-v-a2d6c756 class = 'link'>
                                        <a data-v-a2d6c756 href="#">立即购买</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> `);
            node1.appendTo(".page-main .app-body");

            var nodes = result;//创建小的商品
            for(var i =1;i<nodes.length;i++){
                if(i%2==0){
                    //创建行
                    var row =$(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                            <div data-v-45ef62b1 class = 'row'>
                                
                            </div>
                        </div>
                    </div>
                </div> `);
                row.appendTo(".page-main .app-body")
                }

                //创建列
                $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                <div data-v-45ef62b1 class = 'figure'>
                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
                        <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i].image}" alt=""/>
                    </a>
                </div>
                <h3 data-v-45ef62b1 class = 'title'>
                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}">${result[i].name}</a>
                </h3>
                <p data-v-45ef62b1 class = 'desc'>${result[i].desc}</p>
                <p data-v-45ef62b1 class = 'price'>
                    <strong data-v-45ef62b1>${result[i].price}</strong>元
                    <span data-v-45ef62b1>起</span>
                    <del data-v-45ef62b1>${result[i].del}元</del>
                </p>
            </div>`).appendTo(".channel-product .row");
                               
            }
            }, 
            error:function(msg){
                alert(msg);
            }
        })
    }

    //实现商品列表页轮播图效果
    function banner(){
        //获取页面上所有的图
        var oDivs =$(".swiper-container .swiper-wrapper");
        //获取所有的按钮
        var oBtns =$(".swiper-container .swiper-pagination a");
        
        //设置当前显示图片的下标
        var iNow = 0;
        var timer = null;
        
        //给页面上所有的按钮添加点击
        oBtns.click(function(){
            iNow = $(this).index();
            Tab();
            return false;//阻止默认行为
        })
        timer=setInterval(function(){
            iNow++;
            Tab();
        },2000);

        //切换的函数
        function Tab(){
            oBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
            if(iNow == oBtns.size()){
                oBtns.eq(0).addClass("swiper-pagination-bullet-active");
            }
            oDivs.animate({
                left:-2560*iNow
            },1000,function(){
                //最后一张图片结束的时候
                if(iNow==oBtns.size()){
                    iNow = 0;
                    oDivs.css("left",0);
                }
            });
        }
        //给整个轮播图添加移入移出控件
        $(".swiper-container").mouseenter(function(){
            clearInterval(timer);
        })
        $(".swiper-container").mouseleave(function(){
            timer=setInterval(function(){
                iNow++;
                Tab();
            },2000);
        })
    }


    return{
        download:download,
        banner:banner
    }
})
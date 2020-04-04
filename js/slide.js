define(["jquery"],function($){ //引进jquery文件

    //下载数据的函数
    function download(){
        $.ajax({
            type:"get",
            url:"../data/slide.json",
            success:function(result){
                var slideArr = result.data.list.list;
                for(var i = 0;i<slideArr.length;i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                    <a href="#" target = "_blank">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                            </div>
                            <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                            <p class = 'desc'>${slideArr[i].desc}</p>
                            <p class = 'price'>
                                <span>${slideArr[i].seckill_Price}</span>元
                                <del>${slideArr[i].goods_price}元</del>
                            </p>
                        </div>
                    </a>
                </li> `).appendTo("#J_flashSaleList .swiper-wrapper");
                }
            },
            error:function(msg){
                alert(msg);
            }
        })
    }

    //商品列表滚动
    function slideTab(){
        var aSpans =$(".swiper-controls").find("span");//获取标签
        var iNow  = 0;//显示的下标默认从0开始，每四个图片为一组
        var count = Math.ceil(26/4)-1;//最后一组需要单独处理
        //启动一个定时器，自行滚动
        var timer =setInterval(function(){
            iNow++;//组数自加
            if(iNow == count){
                clearInterval(timer);
            }
            tab();
        },4000) 

        function tab(){//banner图滚动效果
            iNow==0? aSpans.eq(0).addClass('swiper-button-disabled'):aSpans.eq(0).removeClass('swiper-button-disabled')//第一组向左禁用,不是第一组可以使用
            iNow==count?aSpans.eq(1).addClass('swiper-button-disabled'):aSpans.eq(1).removeClass('swiper-button-disabled')//最后一组组向左禁用,不是第一组可以使用

            //计算要运动的目的值
            /* if(iTarget>7*-992+496){
                clearInterval(timer);
            } */
            var iTarget = iNow==count?iNow*-992+496:iNow*-992;//如果是最后一组数据，则移动距离减少两个图片的位置
            $("#J_flashSaleList ul").css({
                transform:` translate3d(${iTarget}px, 0px, 0px)`,//运动属性
                transitionDuration: "1000ms" //动画时间属性
            })
        }

        aSpans.click(function(){
            if($(this).index()==0){
                //左方向
                iNow--;
                iNow=Math.max(0,iNow);//限制inow出界
            }else{
                iNow++;
                iNow=Math.min(count,iNow);
            }
            tab();
        })

        $("#J_flashSaleList").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer =setInterval(function(){
                iNow++;//组数自加
                
                if(iNow == count){
                    clearInterval(timer);
                }
                tab();
            },4000)
        })
    }



    return {
        download:download,
        slideTab:slideTab
    }
})
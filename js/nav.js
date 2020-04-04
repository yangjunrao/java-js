//首页导航部分  声明模块遵从AMD

define(["jquery"],function($){
    function download(){
        //数据的下载
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(result){
                // alert(result);
                var bannerArr = result.banner;
                
                //通过循环把banner添加到页面上
                for(var i = 0;i<bannerArr.length;i++){
                   $(`<a href="${bannerArr[i].url}">
                   <img class="swiper-layz swiper-lazy-loaded" src="../images/banner/${bannerArr[i].img}" alt=""></a>`).appendTo('#J_homeSwiper .swiper-slide');

                var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                if(i==0){
                    node.addClass("swiper-pagination-bullet-active");
                }

                node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error:function(msg){
                alert(msg);
            }
        })
    }

    //实现轮播图的轮播效果
    function banner(){
        var iNow = 0;//当前图片显示的下标,默认显示为0
        var aImgs = null;//记录页面上所有图片
        var aBtns = null;//记录页面上小圆圈按钮

        var timer=setInterval(function(){
            iNow++;
            tab();
        },2500)

        //封装一个切换函数
        function tab(){
            if(!aImgs){
                aImgs =$("#J_homeSwiper .swiper-slide").find("a");//找到当前页面上的图片

            }
            if(!aBtns){
                aBtns=$("#J_homeSwiper .swiper-pagination").find("a");
            }
            if(iNow==5){//循环播放
                iNow=0;
            }
            //图片切换。先将所有的图片隐藏
            aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({"opacity":1},500);
            //小圆点按钮切换
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //添加鼠标移入移出
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer=setInterval(function(){
                iNow++;
                tab();
            },2500)
        })

        //点击页面上的小圆圈可以切换到对应的图片 注：使用事件委托
        $("#J_homeSwiper .swiper-pagination").on("click","a",function(){
            iNow = $(this).index();//获取点击的下标
            tab();
            return false;//阻止a连接的默认行为
        })

        $(".swiper-button-prev,.swiper-button-next").click(function(){//banner图上的左右切换按钮
            if(this.className=="swiper-button-prev"){
                iNow--;
                if(iNow == -1){//循环
                    iNow =4;
                }
            }else{
                iNow++;

            }
            tab();
        })

    }

    //侧边导航栏数据的加载
    function leftNavDownload(){
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(result){
                var slideArr = result.sideNav;
                for(var i =0;i<slideArr.length;i++){
                    var node =$(`<li class = 'category-item'>
                    <a href="/index.html" class = 'title'>
                        ${slideArr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix">
                        
                    </div>
                </li>`)
                node.appendTo("#J_categoryList");
                
                //取出当前这个选项对应的子节点
                var childArr = slideArr[i].child; 

                //一共有多少列  需求：每列6条数据
                var col = Math.ceil(childArr.length/6);

                //计算一共有多少列，然后设置对应的css样式
                node.find("div.children").addClass("children-col-"+ col);//children-col-1 一列  children-col-2两列

                //通过循环创建右侧的上面的每一个数据  子数据
                for(var j=0; j<childArr.length; j++){
                    if(j % 6==0){
                        var newUl=$(` <ul class="children-list children-list-col children-list-col-${parseInt(j/6)}">
                        </ul>`);
                        newUl.appendTo(node.find("div.children"));
                    }
                    $(`<li>
                    <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                        <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                        <span class="text">${childArr[j].title}</span>
                    </a>
                </li>`).appendTo(newUl);
                }



                }

            },
            error:function(msg){
                alert(msg);
            }
        })
    }
    
    //给侧边导航添加移入切换效果  选项卡切换效果
    function lefNavTab(){
        //通过事件委托添加移入移出的效果
        $("#J_categoryList").on("mouseenter",".category-item",function(){
            $(this).addClass("category-item-active");
        });
        $("#J_categoryList").on("mouseleave",".category-item",function(){
            $(this).removeClass("category-item-active");
        })
    }

    //下载顶部导航数据
    function topNavdownload(){
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(result){
             //将顶部数据全部取出来
             var topNavArr = result.topNav;
             topNavArr.push({title:"服务"},{title:"社区"})//添加两个数据title
             for(var i=0;i<topNavArr.length;i++){
                 $(`<li data-index='${i}' class="nav-item">
                 <a href="javascript: void(0);" class="link">
                     <span class="text">${topNavArr[i].title}</span>
                 </a>
             </li>`).appendTo(".site-header .header-nav .nav-list");

              var node=$(`<ul class="children-list clearfix" style="display: ${i==0? "block":"none"};"></ul>`);
              node.appendTo("#J_navMenu .container");
              //取出所有的子菜单
              if(topNavArr[i].childs){  //如果有子菜单才进行这个操作
                var childArr = topNavArr[i].childs;
                for(var j =0;j<childArr.length;j++){
                    $(`<li>
                    <a href="#">
                        <div class="figure figure-thumb">
                            <img src="${childArr[j].img}" alt="">
                        </div>
                        <div class="title">${childArr[j].a}</div>
                        <p class="price">${childArr[j].i}</p>
                    </a>
                </li>`).appendTo(node);
                }
              }
             }
            },
            error:function(msg){
                alert(msg)
            }

        })
    }
        //顶部导航移入移出效果
        function topNavTab(){
            $(".header-nav .nav-list").on("mouseenter",".nav-item",function(){
                $(this).addClass("nav-item-active");
                //找出当前移入的a标签下标
                var index= $(this).index()-1;
                if(index >=0 && index<=6){
                    $("#J_navMenu").css("display","block").removeClass("slide-up").addClass("slide-down");
                    $("#J_navMenu .container").find("ul").eq(index).css("display","block").siblings("ul").css("display","none");
                }
            })
            $(".header-nav .nav-list").on("mouseleave",".nav-item",function(){
                $(this).removeClass("nav-item-active");
            })
             $(".site-header").mouseleave(function(){//移出到整个顶部之外
                $("#J_navMenu").removeClass("slide-down").addClass("slide-up").css("display","block");
            }) 
        }
        //商品列表页左侧栏鼠标移入移出效果
        function allGoodsTab(){
            $(".header-nav .nav-list").on("mouseenter",".nav-category",function(){
                $(this).addClass("nav-category-active");
                $(this).find(".site-category").css({
                    display:"block"
                })
            })
            $(".header-nav .nav-list").on("mouseleave",".nav-category",function(){
                $(this).removeClass("nav-category-active");
                $(this).find(".site-category").css({
                    display:"none"
                })
            })
        }

        //搜索框

        function searchTab(){
            $("#search").focus(function(){
                $("#J_keywordList").removeClass("hide").addClass("show");
            }).blur(function(){
                $("#J_keywordList").removeClass("show").addClass("hide");
            })
        }


    return{
        download:download,
        banner:banner,
        leftNavDownload:leftNavDownload,
        lefNavTab:lefNavTab,
        topNavdownload:topNavdownload,
        topNavTab:topNavTab,
        searchTab:searchTab,
        allGoodsTab:allGoodsTab
    }
})

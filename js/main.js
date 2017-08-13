$(document).ready(function(){
    //鼠标点击li时添加class="current"
    $(".navRight li").each(function(){
        $(this).click(function(){
            $("li").not($(this)).removeClass("current");
            $(this).addClass("current");
        });
    });
  
    
    //1.最新壁纸
    $(".pic360").click(function(){
        deBingYPlug();
        var flag=$(".navRight li").eq(0).hasClass("current");
        if(flag==false){
            pic360();
        }
    });

    //2.分类壁纸
    classify();

    //3.必应壁纸
     $(".bingY").click(function(){
        var flag=$(".navRight li").eq(2).hasClass("current");
        if(flag==false){
            bingying();
        }
    });

    //4.每日英语
    $(".everyE").click(function(){
        deBingYPlug();
        jingshan();
    });
    
    //初始化调用最新壁纸
    pic360();
    //1. 360最新壁纸
    var oStart=0;
    var b=true;
    var navName=true;
    function pic360(){
        showOrHide();
        showOrHide2();

        $.ajax({
            type: "GET", 
            url: "../02-Wallpaper/pic360.php",
            dataType : "json",
            data:{start:oStart},
            success: function(data){
                //如果数据全部加载完成
                if(! data.data.length){
                    $(".loading").remove();
                    $(".newPic").append("<span class='loadC'>所有壁纸均已加载完成<span>");
                    return;
                }

                for(var i=0;i<data.data.length;i++){
                    //设置图片的宽高
                    var resolu=data.data[i].resolution;
                    var imgW=resolu.substring(0,4);
                    var imgH=resolu.substring(5);
                    var ratio=imgW/imgH;
                    var height=452/ratio+"px";

                    var oDiv=$("<div><a href="+data.data[i].url+" target='_blank'><img alt="+data.data[i].utag+" style="+"width:452px;height:"+height+" src="+data.data[i].url+"></a></div>");
                    var oUl=plbDownload(data.data[i],oDiv);

                    //给图片设置背景色
                    $(".oImg").css("background","rgba(0,0,0,0.8)");
                    oDiv.append(oUl);
                }
                b=true;
                $(".loading").remove();
            }
        });
        navName=true;
    } 

    //滚动条滚动时
    window.onscroll=function(){
        var shortIndex=getShortIndex();
        var shortLi=lis[shortIndex];
        var sTop=document.documentElement.scrollTop||document.body.scrollTop;//滚动条距页面顶部
        var canSeeH=document.documentElement.clientHeight||document.body.clientHeight;//可视区的高
        var shortLiH=getTop(lis[shortLi])+shortLi.offsetHeight;//最短li的高+其距页面顶部距离
        //alert(canSeeH);

        //当最短li完全进入可视区时，加载下一次
        //如果navName=true(最新壁纸)调用pic360();。如果navName=false(分类壁纸)，调用getClassifyPic()
        if(shortLiH<sTop+canSeeH){
            if(b){
                $(".loading").remove();
                oStart+=9;
                if(navName){
                    pic360();
                }else{
                    getClassifyPic(oId,oStart);
                }
                b=false;
                $(".newPic").append("<span class='loading'>努力加载中......</span>");
            }
        }

        //回到顶部
        if (sTop>=661) {
            $(".backToTop").show();
            $(".backToTop").click(function(){
                scrollTo(0,0);
            });
        }else{
            $(".backToTop").hide();
        }
    }
    
    //获得某元素的高度
    function getTop(obj){
        var oTop=0;
        while(obj){
            oTop=obj.offsetTop;
            obj=obj.offsetParent;//最近的父元素
        }
        return oTop;
    }

    //2.
    function  classify(){
        $.ajax({
            type: "GET", 
            url: "../02-Wallpaper/classify.php", 
            data: "cid=360tags",
            dataType : "json",
            success:function(data){
                for(var i=0;i<data.data.length;i++){
                    $(".dropdown-menu").append("<li class='fl'><a id="+data.data[i].id+" class='everyC fl'>"+data.data[i].name+"</a></li>");
                }
                $(".everyC").each(function(){
                    $(this).click(function(){
                        $(".loading").remove();
                        $(".newPic ul").before("<span class='loading'>努力加载中……</span>");
                        
                        //删除必应图片插件css的影响
                        deBingYPlug();

                        $(".everyC").not($(this)).removeClass("current");
                        $(this).addClass("current");
                         
                        oId=this.id; 
                        getClassifyPic(this.id,0);

                        $(".newPic li div").remove();
                        var newLisLen=(".newPic li").length;
                        for(var i=3;i<newLisLen;i++){
                            $(".newPic li").eq(i).remove();
                        }
                    });
                });
            }
        });
    }
    
    function getClassifyPic(oCid,start){
        showOrHide();

        $.ajax({
            type: "GET", 
            url: "../02-Wallpaper/everyClassify.php", 
            data:{cid:oCid,start:start},
            dataType : "json",
            success:function(data){
                //如果数据全部加载完成
                if(! data.data.length){
                    loadComplete();
                    return;
                }

                for(var i=0;i<data.data.length;i++){
                    //设置图片的宽高
                    var resolu=data.data[i].resolution;
                    var imgW=resolu.substring(0,4);
                    var imgH=resolu.substring(5);
                    var ratio=imgW/imgH;
                    var height=452/ratio+"px";

                    var oDiv=$("<div><a href="+data.data[i].url+" target='_blank'><img class='oImg' style="+"width:452px;height:"+height+" src="+data.data[i].url+"></a></div>");
                    
                    $(".oImg").css("background","rgba(0,0,0,0.8)");
                    var oUl=plbDownload(data.data[i],oDiv);
                    oDiv.append(oUl);
                }
                b=true;
                $(".loading").remove();
            }
        })
        navName=false;
    }
    //下拉菜单
    $(".dropdown-toggle").dropdown();


    //3.必应美图（16张）
    function bingying(){
        //删除必应图片插件css的影响
        deBingYPlug();

        //添加link css
        $("head").append("<link>");
        css = $("head").children(":last");
        css.attr({
            rel: "stylesheet",
            type: "text/css",
            href: "../02-Wallpaper/css/jquery.pagepiling.css"
        });
        //盒子容器的样式
        $(".picContainer").css({
            "height":0,
            "padding":0
        });
        $(".newPic").hide();

        //加载中
        $(".main").append("<div class='loading load'>努力加载中......</div>");

        $.ajax({
            type:"GET",
            url:"../02-Wallpaper/api.php?time=?r="+Math.random(),
            dataType:"html",
            success:function(data){
                $(".picContainer").html("<div id='pagepiling'><a download class='download'></a>"+data+"<div>");
                
                //下载的提示工具
                $(".download").attr("data-toggle","tooltip");
                $(".download").attr("title","下载当前图片");
                $(function(){
                    $("[data-toggle='tooltip']").tooltip();

                })
                
                //初始化下载图片图标
                imgSrc= $(".section").eq(0).text();
                $(".download").attr("href",imgSrc);

                $('#pagepiling').pagepiling({
                    //当翻页的时候改变下载图片的地址
                    onLeave: function(index, nextIndex, direction){
                        imgSrc= $(".section span").eq(nextIndex-1).text();
                        $(".download").attr("href",imgSrc);
                    },
                });

                $(".loading").remove();

            }

        });
    }

    //4.金山每日英语 
    function jingshan(){
        //加载中
        $(".main").append("<div class='loading load'>努力加载中......</div>");
         
        //盒子容器的样式
        $(".picContainer").css({
            "height":661,
            "padding-top":0,
            "padding-left":0
        });

        $("head").append("<link>");
        css = $("head").children(":last");
        css.attr({
            rel: "stylesheet",
            type: "text/css",
            href: "../02-Wallpaper/css/jquery.pagepiling.css"
        });

        $.ajax({
            type:"GET",
            url:"http://open.iciba.com/dsapi/",
            dataType:"jsonp",
            success:function(datas){
                var html="<div id='everyBox' class='img-responsive'><p class='everyEng'>"+datas.content+"</p><p class='everyCh'>"+datas.note+"</p></div><a download class='download'></a>";
                $(".picContainer").html(html);

                //样式设置
                $("#everyBox").css({
                    "background":"url("+datas.picture2+") no-repeat",
                    "background-size":"100%",
                    "height":661,
                    "width":1366
                }); 
                $(".everyEng,.everyCh").css({
                    "position":"absolute",
                    "bottom":40,
                    "left":20,
                    "font-weight":"bold",
                    "color":"#ecede8"
                });
                $(".everyCh").css({
                    "bottom":10
                });
                
                //下载图片
                $(".download").attr("href",datas.picture2);

                $(".loading").remove();
            }
        });
        return true;
    }

    //一些公共部分
    //a.删除必应插件影响 
    function deBingYPlug(){
        $("#pp-nav").remove();
        var oLink=$("[href='../02-Wallpaper/css/jquery.pagepiling.css']");
        oLink.remove();
    }

    //b.给瀑布流的壁纸加上下载的内容
    function plbDownload(data,oDiv){
        oUl="<ul class='downloadUl'><a download href="+data.img_1024_768+">1024X768<span></span></a>"+
        "<a download href="+data.img_1280_800+">1280X800<span></span></a>"+
        "<a download href="+data.img_1280_1024+">1280X1024<span></span></a>"+
        "<a download href="+data.img_1366_768+">1366X768<span></span></a>"+
        "<a download href="+data.img_1440_900+">1440X900<span></span></a></ul>";
        
        //把图片插入最短li
        var shortIndex=getShortIndex();
        $(".newPic li").eq(shortIndex).append(oDiv);

        //鼠标移入移出时，显示隐藏oul
        $(".newPic div").mouseover( function() {
            $(this).children().eq(1).css("display","block");
            //var keyword=$(this).children("a").children("img").attr("alt");//提示框
        }).mouseout( function(){
            $(this).children().eq(1).css("display","none")
        });
        return oUl;
    }

    //c.切换时的一些元素的隐藏或显示
    function showOrHide(){
        $(".newPic").show();
        $(".picContainer").css("height",0);
        $(".picContainer").html("");
        $(".download").hide(); 
    }
    
    function showOrHide2(){
        if (navName==false) {
            $(".newPic li div").remove();
            var newLisLen=(".newPic li").length;
            for(var i=3;i<newLisLen;i++){
                $(".newPic li").eq(i).remove();
            }
        };
    }

    //d.瀑布流，获得最短li的下标
    var lis=$(".newPic li");
    var len=lis.length;
    function getShortIndex(){
        var index=0;
        var liH=lis[0].offsetHeight;
        for(var i=1;i<len;i++){
            if(liH>lis[i].offsetHeight){
                index=i;
                liH=lis[i].offsetHeight;
            }
        }
        return index;
    }

    //e.所有壁纸均已加载完成
    function loadComplete(){
        $(".loading").remove();
        $(".newPic").append("<span class='loadC'>所有壁纸均已加载完成<span>");
    }
})
/**
 * Created by WXH on 2017/4/2.
 */
$(function(){
        var productid = getargs(window.location.search)["productid"];
        /*全局标记，记录评论是否加载过*/
        var hasCommend = false;
        /* html动态数据 行内样式 调整*/
        // 去掉td 的rowspan属性
        $(".panels td").attr("rowspan",0);
        /*渲染 面包屑导航条*/
        // 渲染 第二级菜单 分类信息
        var categoryid = window.sessionStorage.getItem("categoryid");
        $.ajax({
                url:"http://139.199.157.195:9090/api/getcategorybyid?categoryid="+categoryid,
                crossDomain:true,
                error:err,
                success:function(data){
                        $("#twice").attr("href","category.html?categoryid="+categoryid)
                                .html( data.result[0]["category"] );
                }
        });
        /*获取 商品信息*/
        var productid = getargs( window.location.search )[ "productid" ];
        $.ajax({
                url:"http://139.199.157.195:9090/api/getproduct?productid="+productid,
                crossDomain:true,
                error:err,
                success:function(data){
                        // 渲染 面包屑导航栏
                        $("#current").html( frontLetter( data.result[0]["productName"] ) );

                }
        });
        // 3个面板点击效果
        $(".content").on("click",".titles > div",function(){
                var $this = $(this);
                // 标题样式 变化
                $this.addClass("active").siblings().removeClass("active");
                // 面板切换
                $(".panels > div").eq( $this.attr("data-val")).removeClass("hide").siblings().addClass("hide");
                // 没有评论时，加载评论
                if( $this.attr("id") == "com" ){
                        if( !hasCommend ){
                                // 加载评论
                                renderComment( productid );
                                hasCommend = true;
                        }
                }
        });
        // 渲染页面
        renderContent( productid );
});
// 加载并渲染页面
function renderContent( productid ){
        $.ajax({
                url:"http://139.199.157.195:9090/api/getproduct?productid="+productid,
                crossDomain:true,
                error:err,
                success:function(data){
                        $(".content").html(template("t_content",data.result[0]));
                }
        })
}
// 加载并渲染评论
function renderComment( productid ){
        $.ajax({
                url:"http://139.199.157.195:9090/api/getproductcom?productid="+productid,
                crossDomain:true,
                error:err,
                success:function(data){
                        $(".comment_con").html( template("t_commend",data) );
                        // 修改标题
                        $("#com").text("评价（"+data.result.length+")");
                }
        })
}
function trackLog(){
        // 未实现
}
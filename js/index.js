/**
 * Created by WXH on 2017/3/31.
 */
$(function(){
        /*zepto中ajax模块依赖于event模块*/
        /*nav导航部分*/
        // 请求导航数据
        $.ajax({
                url:"http://139.199.157.195:9090/api/getindexmenu",
                crossDomain:true,
                err:err,
                success:function(data){
                        $("ul.navs").html(template("navs",data));
                }
        });
        // 点击更多，最后一个显示或隐藏
        $("ul.navs").delegate("li:nth-last-child(5)","click",function(){
                $("ul.navs > li:nth-last-child(-n+4)").toggleClass("hide");
        });
        /*折扣商品部分*/
        // 请求商品数据
        $.ajax({
                url:"http://139.199.157.195:9090/api/getmoneyctrl",
                crossDomain:true,
                err:err,
                success:function(data){
                        $("ul.products").html( getProductListRender("moneyctrl")(data) );
                }
        })
})
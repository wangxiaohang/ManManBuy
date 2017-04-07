/**
 * Created by WXH on 2017/4/5.
 */
$(function(){
        // 请求导航数据
        $.ajax({
                url:"http://139.199.157.195:9090/api/getbaicaijiatitle",
                dataType:"jsonp",
                error:err,
                success:function(data){
                        $(".nav ul").html(template("navs",data));
                        // 动态设置ul宽度
                        var w = 0, lis = $(".nav ul li");
                        lis.each(function(){
                                w += $(this).width();
                        })
                        /*???为什么计算出来的宽度，还是会挤下来*/
                        $(".nav ul").width( w + 1 );
                        // .nav绑定touch事件
                        // 缓冲距离
                        var dis = 100,
                                lw = $(".nav ul").width(), sw = $(".nav").width() ;
                        tapX({
                                // 绑定 touch事件 的对象
                                o : $(".nav"),
                                // 滑动的对象
                                so : $(".nav ul"),
                                // 不提供，想拉多少拉多少
                                //min_s : sw - lw - dis,
                                //max_s : dis,
                                min_d : sw - lw,
                                max_d : 0
                        });
                }
        });
        // 渲染页面
        renderproduct( 0 );
        // 导航栏绑定点击事件
        $(".nav ul").on("click","li",function(){
                // 改变样式
                $(this).addClass("active").siblings().removeClass("active");
                // 渲染数据
                renderproduct( $(this).attr( "data-titleid" ) );
        });
        // 渲染页面 商品数据
        function renderproduct( titleid ){
                $.ajax({
                        url:"http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleid,
                        error:err,
                        success:function(data){
                                $(".main ul").html( template("main",data) );
                        }
                })
        };
        // 下拉 小于100px ，top按钮不显示
        // 下拉 100px是top按钮开始显示，
        // 100px-150px透明度由0变为0.8,
        // 下拉 大于 100px,top按钮 透明度为0.8
        scrollpage({
                obj : $("#totop"),
                dis_show : 100 ,
                dis_opa : 500
        });
});
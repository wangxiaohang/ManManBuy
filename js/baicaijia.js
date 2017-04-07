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
                }
        });
});